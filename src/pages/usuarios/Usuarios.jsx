import { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { TuplaData } from "../../components/TuplaData"
import Elementos from "../../components/Elementos";

const Usuarios = (props) => {
    const { user, getAllUser, deleteUser } = useContext(UserContext)

    const tablaUsuariosBody = useRef()

    const [usuarios, setUsuarios] = useState([])
    const [pagina, setPagina] = useState(1)
    const [total, setTotal] = useState(0)
    const [size, setSize] = useState(0)
    const [q, setQ] = useState(null)
    const [dofetch, setDofetch] = useState(true)

    useEffect(async () => {
        console.log('useEffect usuarios render')
        fetchAllUsers()
    }, [user, pagina, dofetch])

            async function fetchAllUsers() {
                //todo:verificar si la pagina es la misma, puede q este en la ultima pagina y esta desaparesca a eliminar su unico elemento
                var iusuarios = await getAllUser(pagina, q)
                if (iusuarios) setUsuariosInfo(iusuarios)
                console.log('iusers: ', iusuarios);
            }
    function setUsuariosInfo(iusuarios) {
        setUsuarios(iusuarios.content)
        setSize(iusuarios.size)
        setTotal(iusuarios.totalElements)
    }

    async function onChangePagination(page) {
        console.log('page: ', page);
        setPagina(page)
    }

    function onClickTableBody(e) {
        // click en eliminar
        if (e.target.classList.contains('btn-delete')) {
            var id = e.target.dataset.id
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `¿Seguro que desea eliminar el usuario?`,
                showDenyButton: true,
                confirmButtonText: 'OK'
            }).then(async(result) => {
                if (result.isConfirmed) {
                    var ok = await deleteUser(id)
                    console.log('ok: ', ok);
                    if (ok) fetchAllUsers()
                }
            })
        }
    }

    function buscarByName(q) {
        console.log('q: ', q);
        setQ(q)
        if (pagina == 1)
            setDofetch(!dofetch)
        else
            setPagina(1)
    }

    return (<>
        <Elementos
            titleTable='Lista de usuarios'
            linkCreate='/usuarios/crear'
            buscarByQ={buscarByName}
            pagina={pagina}
            size={size}
            total={total}
            phSearch='nombre'
            onchange={onChangePagination} >

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

                    {usuarios.length > 0 ?
                        (usuarios.map((usuario, i) => <TuplaData key={i} usuario={usuario} />))
                        : null}

                </tbody>
                <tfoot>

                </tfoot>
            </table>

        </Elementos>
    </>)
}
export default Usuarios