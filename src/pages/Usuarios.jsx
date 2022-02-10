import { memo, useContext, useEffect, useMemo, useRef, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { TuplaData } from "../components/TuplaData"
import Pagination from 'rc-pagination';

export const Usuarios = memo((props) => {
    const { user, validToken, createUser, getUserById, getAllUser, updateUser, deleteUser } = useContext(UserContext)
    const formUsuarios = useRef()
    const selRoles = useRef()
    const tablaUsuariosBody = useRef()

    const [roles, setRoles] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [pagina,setPagina] = useState(0)
    const [total,setTotal] = useState(0)
    const [size,setSize] = useState(0)

    /*const tusuarios = useMemo( async ()=>{
        console.log('use memo');
        var u = await getAllUser(pagina)
        if(u)
        setUsuariosInfo(u)
        return u
        //if (users) setUsuariosInfo(users)
    },[user,pagina])*/

    useEffect(async () => {
        console.log('useEffect usuarios render');

        //talvez aqui no deba estar
        updateUsers()
        
        const roles = await getRoles()
        if (roles) setRoles(roles)
        
    },[user,pagina])

    async function sendDataUser(e) {
        e.preventDefault()

        var id = formUsuarios.current.elements['idUsuario'].value
        var nombre = formUsuarios.current.elements['nombreUsuario'].value
        var password = formUsuarios.current.elements['passwordUsuario'].value
        var repassword = formUsuarios.current.elements['re-passwordUsuario'].value

        var iroles = getRolesIdsForm()

        var usuario = { "username": nombre, "password": password, "repassword":repassword, "roles": iroles }
        if (id) {
            updateUser(usuario)
        } else {
            const ok = await createUser(usuario)
            if (ok) {
                //todo:limpiar formulario
                updateUsers()
            }
        }
    }

    async function onClickTableBody(e) {

        // click en eliminar
        if (e.target.classList.contains('btn-delete')) {
            var id = e.target.dataset.id
            var ok = await deleteUser(id)
            console.log('ok: ',ok);
            if (ok) {
                //todo:limpiar formulario
                updateUsers()
            }
        }

        // click en editar
        if (e.target.classList.contains('btn-edit')) {
            var id = e.target.dataset.id
            var u = await getUserById(id)

            console.log('u: ', u);

            var inNombre = formUsuarios.current.querySelector('#us-nombre')
            var inId = formUsuarios.current.querySelector('#us-id')
            inNombre.value = u.username
            inId.value = u.id

        }
    }

    async function getRoles() {
        if (typeof (user) == 'object') {
            var response = await fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/roles`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                })
            })
            var data = await response.json()
            return data
        } else { return null }
    }


    function getRolesIdsForm(){
        var iroles = []
        selRoles.current.querySelectorAll('option')
        .forEach( (o)=>{
            if(o.selected)
                iroles.push({"id":o.dataset.id})
        })
        return iroles
    }

    async function onchange(page){
        console.log('page: ',page);
        setPagina(page)
        //const users = await getAllUser(pagina)
        //if (users) setUsuariosInfo(users)
    }

    async function updateUsers(){
        //setPagina(pagina)
        var iusuarios = await getAllUser(pagina)
        if(iusuarios) setUsuariosInfo(iusuarios)
    }

    function setUsuariosInfo(iusuarios){
        setUsuarios(iusuarios.content)
        //setPagina(iusuarios.number+1)
        setSize(iusuarios.size)
        setTotal(iusuarios.totalElements)
    }

    return (<>
        <div className="col-md-6 mt-4">
            {/* <!-- general form elements --> */}
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Crear Usuario</h3>
                </div>

                <form ref={formUsuarios} onSubmit={sendDataUser}>
                    <div className="card-body">
                        <div className="form-group">
                            <input id="us-id" type="hidden" name="idUsuario" className="form-control" />

                            <label htmlFor="us-nombre">Nombre de Usuario</label>
                            <input id="us-nombre" type="text" name="nombreUsuario" className="form-control" placeholder="nombre" />

                            <label htmlFor="us-password">Contraseña</label>
                            <input id="us-password" type="password" name="passwordUsuario" className="form-control" placeholder="password" />

                            <label htmlFor="us-re-password">Confirmar Contraseña</label>
                            <input id="us-re-password" type="password" name="re-passwordUsuario" className="form-control" placeholder="re-password" />


                            <label>Select Multiple</label>
                            <select ref={selRoles} multiple className="form-control">
                                {roles ? roles.flatMap( (rol,i) => <option key={i} data-id={rol.id}>{rol.name.substring(5)}</option> ) : null}
                            </select>



                        </div>
                    </div>

                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </div>
                </form>
            </div>
        </div>

        <div className="col-12 mb-2">
            <Pagination 
                current={pagina}
            pageSize={size}
            total={total}
            onChange={onchange}
            locale={{
                // Options.jsx
                items_per_page: '/ página',
                jump_to: 'Ir a',
                jump_to_confirm: 'confirmar',
                page: 'Página',
              
                // Pagination.jsx
                prev_page: 'Página anterior',
                next_page: 'Página siguiente',
                prev_5: '5 páginas previas',
                next_5: '5 páginas siguientes',
                prev_3: '3 páginas previas',
                next_3: '3 páginas siguientes',
                page_size: 'tamaño de página',
              }}
            readOnly />
        </div>
        <div className="col-12 pb-2">
            <div id="card-categorias" className="card">
                <div className="card-header">
                    <h3 className="card-title">Lista de Usuarios</h3>
                </div>


                <div className="card-body">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Nombre</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody ref={tablaUsuariosBody} onClick={onClickTableBody}>
                            {/* {console.log('u: ',usuarios)} */}
                            
                            {usuarios.length > 0 ?
                                (usuarios.map((usuario, i) => <TuplaData key={i} usuario={usuario} />)) 
                                : null}
                            
                        </tbody>
                        <tfoot>

                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </>)
})