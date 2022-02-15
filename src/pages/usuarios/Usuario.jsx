import { useContext, useEffect, useRef, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"

const Usuario = (props) => {
    const { user, createUser, getUserById, updateUser } = useContext(UserContext)
    const [roles, setRoles] = useState([])
    const formUsuario = useRef()
    const selRoles = useRef()
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState(null)
    //const {usuario} = props
    const { id } = useParams()

    useEffect(async () => {
        console.log('useEffect usuario');
        const iroles = await getRoles()
        console.log('roles: ', iroles);
        if (iroles) setRoles(iroles)
        if (id) {
            try {
                const iuser = await getUserById(id)
                if (iuser) {
                    setUsuario(iuser)
                    setSelectedOptionFromUsuario(iuser)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, [])

    async function sendDataUser(e) {
        e.preventDefault()

        var id = formUsuario.current.elements['idUsuario'].value
        var nombre = formUsuario.current.elements['nombreUsuario'].value
        var password = formUsuario.current.elements['passwordUsuario'].value
        var repassword = formUsuario.current.elements['re-passwordUsuario'].value

        var iroles = getRolesIdsForm()

        var usuario = { "username": nombre, "password": password, "repassword": repassword, "roles": iroles }
        if (id) {
            updateUser(usuario)
        } else {
            const ok = await createUser(usuario)
            if (ok) {
                resetFormCategoriaValues()
                navigate(-1)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Usuario "${nombre}" creado con exito`,
                    confirmButtonText: 'OK'
                })
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No se pudo crear el usuario',
                    confirmButtonText: 'OK'
                })
            }
        }
    }

    async function getRoles() {
        var response = await fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/roles`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            })
        })
        var data = await response.json()
        return data
    }

    function getRolesIdsForm() {
        var iroles = []
        selRoles.current.querySelectorAll('option')
            .forEach((o) => {
                if (o.selected)
                    iroles.push({ "id": o.dataset.id })
            })
        return iroles
    }

    function setSelectedOptionFromUsuario(u) {
        u.roles.forEach((rol) => {
            var op = selRoles.current.querySelector(`option[data-id="${rol.id}"]`)
            console.log('rol: ', rol, 'op: ', op);
            if (op) op.selected = true
        })
    }

    function resetFormCategoriaValues() {
        try {
            formUsuario.current.reset()
            formUsuario.current.querySelector('#cat-id').removeAttribute('value')
        } catch (error) {
            console.log(error)
        }
    }

    return (<>
        <div className="col-md-6 mt-4">
            {/* <!-- general form elements --> */}
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">{usuario ? "Editar Usuario" : "Crear Usuario"}</h3>
                </div>

                <form ref={formUsuario} onSubmit={sendDataUser}>
                    <div className="card-body">
                        <div className="form-group">
                            <input id="us-id" type="hidden" name="idUsuario" className="form-control" />

                            <label htmlFor="us-nombre">Nombre de Usuario</label>
                            <input id="us-nombre" type="text" defaultValue={usuario ? usuario.username : ''} name="nombreUsuario" className="form-control" placeholder="nombre" />

                            <label htmlFor="us-password">Contraseña</label>
                            <input id="us-password" type="password" name="passwordUsuario" className="form-control" placeholder="password" />

                            <label htmlFor="us-re-password">Confirmar Contraseña</label>
                            <input id="us-re-password" type="password" name="re-passwordUsuario" className="form-control" placeholder="re-password" />


                            <label>Select Multiple</label>
                            <select ref={selRoles} multiple className="form-control">
                                {roles ? roles.flatMap((rol, i) => <option key={i} data-id={rol.id} >{rol.name.substring(5)}</option>) : <div />}
                            </select>



                        </div>
                    </div>

                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    </>)
}
export default Usuario