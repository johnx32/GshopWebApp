import { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Elementos from "../../components/Elementos"
import { UserContext } from "../../contexts/UserContext"

const Categorias = (props) => {

    const { user:{token} } = useContext(UserContext)

    const tablaCategoriasBody = useRef()

    const [categorias, setCategorias] = useState([])
    const [pagina, setPagina] = useState(1)
    const [total, setTotal] = useState(0)
    const [size, setSize] = useState(0)
    const [q, setQ] = useState(null)
    const [dofetch,setDofetch] = useState(true)

    useEffect( ()=>{
        console.log('useEffect categorias');
        obtenerCategorias()
    },[pagina,dofetch])

    function obtenerCategorias(){
        fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/categoria?page=${pagina-1}${q?`&nombre=${q}`:""}`,{
            method:'GET',
            headers: new Headers({
                'Authorization':'Bearer '+token
            })
        }).then(response=>response.json())
        .then(categorias=>{
            setCategoriasInfo(categorias)
            //mostrarListaCategorias(categorias)
        }).catch(err=>{
            console.log(err);
        })
    }
            function setCategoriasInfo(icategorias) {
                setCategorias(icategorias.content)
                setSize(icategorias.size)
                setTotal(icategorias.totalElements)
            }


    function onClickTable(e){
        e.preventDefault()
        // click en eliminar
        if(e.target.classList.contains('btn-delete')){
            var id = e.target.dataset.id
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `¿Seguro que desea eliminar el usuario?`,
                showDenyButton: true,
                confirmButtonText: 'OK'
            }).then( async(result) => {
                if (result.isConfirmed) 
                    deleteCategoriaById(id)
            })
        }

        // click en editar
        if(e.target.classList.contains('btn-edit')){
            var id = e.target.dataset.id
            //obtenerCategoriaById(id)
        }
    }

    function deleteCategoriaById(id){
        fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/categoria/${id}`,{
            method:'DELETE',
            headers: new Headers({
                'Authorization':'Bearer '+token
            })
        }).then(response=>response)
        .then(data=>{
            obtenerCategorias()
        })
    }

    function CargarCategoriaAForm(categoria){
        var inNombre=formCategoria.current.querySelector('#cat-nombre')
        var inId=formCategoria.current.querySelector('#cat-id')
        inNombre.value=categoria.nombre
        inId.value=categoria.id
    }

    async function onChangePagination(page) {
        console.log('page: ', page);
        setPagina(page)
    }

    function buscarByName(q) {
        console.log('q: ', q);
        setQ(q)
        if(pagina==1)
            setDofetch(!dofetch)
        else
            setPagina(1)
    }

    function Tupla({categoria}){
        return(<tr>
            <td>{categoria.id}</td>
            <td>{categoria.nombre}</td>
            <td><div className='centrar width100'><button data-id={categoria.id} type="button" className="btn btn-delete btn-danger btn-sm">Eliminar</button></div></td>
            <td><div className='centrar width100'>
                    <Link to={`/categorias/${categoria.id}`}>
                        <button data-id={categoria.id} type="button" className="btn btn-edit  btn-success btn-sm">Editar</button>
                    </Link>
            </div></td>
        </tr>)
    }


    return (<>
        <Elementos
            titleTable='Lista de categorias'
            linkCreate='/categorias/crear'
            buscarByQ={buscarByName}
            pagina={pagina}
            size={size}
            total={total}
            phSearch='nombre'
            onchange={onChangePagination}>
            <table id="tabla-categorias" className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nombre</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody ref={tablaCategoriasBody} onClick={onClickTable}>
                    {categorias.length > 0 ?
                        (categorias.map((categoria, i) => <Tupla key={i} categoria={categoria} />))
                        : null}
                </tbody>
                <tfoot>

                </tfoot>
            </table>
        </Elementos>
    </>);
}
export default Categorias;