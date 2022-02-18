import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Elementos from "../../components/Elementos";
import { UserContext } from "../../contexts/UserContext";
import { eliminarProductoById, obtenerProductos } from "../../fetchs/fetchProductos";

const Productos = (props) => {

    const { user:{token} } = useContext(UserContext)
    const [productos, setProductos] = useState([])
    const navigate = useNavigate()
    const [pagina, setPagina] = useState(1)
    const [total, setTotal] = useState(0)
    const [size, setSize] = useState(0)
    const [doEffect,setDoEffect] = useState(true)
    const [q, setQ] = useState(null)
    const tablaProductosBody = useRef()


    useEffect(async ()=>{
        console.log('useEffect productos');
        
        const dataProductos = await obtenerProductos(token,pagina,q)
        if(dataProductos){
            setProductos(dataProductos.content)
            setSize(dataProductos.size)
            setTotal(dataProductos.totalElements)
        }
        //fetchProductos()
    },[pagina,doEffect,q])    

    function onChangePagination(page){
        setPagina(page)
    }

    async function deleteProductoById(id){
        
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `¿Seguro que desea eliminar este producto?`,
            showDenyButton: true,
            confirmButtonText: 'OK'
        }).then( async(result) => {
            if (result.isConfirmed){
                const ok = await eliminarProductoById(token,id)
                setDoEffect(!doEffect)
                if(ok)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Producto eliminado con exito`,
                        confirmButtonText: 'OK'
                    })
            }
        })
    }

    function searchByTitulo(q) { setQ(q) }

    function Tupla({ producto }) {
        return (<tr>
            <td>{producto.id}</td>
            <td><img src={producto.img_url} alt={producto.titulo} style={{width:'100px'}} /></td>
            <td>{producto.titulo}</td>
            <td><div className='centrar width100'>
                <button data-id={producto.id} onClick={()=>deleteProductoById(producto.id)} type="button" className="btn btn-delete btn-danger btn-sm">Eliminar</button>
            </div></td>
            <td><div className='centrar width100'>
                <button data-id={producto.id} onClick={() => navigate(`/productos/${producto.id}`)} type="button" className="btn btn-edit  btn-success btn-sm">Editar</button>
            </div></td>
        </tr>)
    }

    return (<>
        <Elementos
            titleTable='Lista de productos'
            linkCreate='/productos/crear'
            buscarByQ={searchByTitulo}
            pagina={pagina}
            size={size}
            total={total}
            phSearch='producto'
            onchange={onChangePagination} >

            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>imagen</th>
                        <th>Nombre</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody ref={tablaProductosBody} >
                    {productos.length > 0 ?
                        (productos.map((producto, i) => <Tupla key={i} producto={producto} />))
                        : null}
                </tbody>
                <tfoot>

                </tfoot>
            </table>

        </Elementos>

    </>)
}
export default Productos