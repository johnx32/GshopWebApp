import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"
import { obtenerCategorias } from "../../fetchs/fetchCategoria"
import { actualizarProducto, crearProducto, obtenerProductoById } from "../../fetchs/fetchProductos"

const Producto = (props) => {

    const { user: { token } } = useContext(UserContext)
    const navigate = useNavigate()
    const selectCategorias = useRef()
    const formProducto = useRef()
    const { id } = useParams()
    const [producto, setProducto] = useState(null)
    const [categorias, setCategorias] = useState([])

    useEffect(async () => {
        console.log('useEffect producto')

        const dataCategorias = await obtenerCategorias(token)
        if (dataCategorias) setCategorias(dataCategorias.content)

        console.log('param: ', id)
        if (id) {
            const p = await obtenerProductoById(token, id)
            if (p) {
                // formProducto.current.elements['titulo-producto'].value = p.titulo
                // formProducto.current.elements['url-img'].value=p.img_url
                // formProducto.current.elements['n-description'].value=p.descripcion
                // formProducto.current.elements['price'].value=p.precio
                // formProducto.current.elements['stock'].value=p.stock
                setProducto(p)
                console.log('prod: ',p);
                const sel = selectCategorias.current.querySelector(`option[data-id="${p.categoria.id}"]`)
                sel ? sel.selected = true : null;
            }

        }

    }, [])

    async function submitData(e) {
        e.preventDefault()

        var titulo = formProducto.current.elements['titulo-producto'].value
        var img_url = formProducto.current.elements['url-img'].value
        var descripcion = formProducto.current.elements['n-description'].value
        var precio = formProducto.current.elements['price'].value
        var stock = formProducto.current.elements['stock'].value
        var idCategoria = selectCategorias.current.options[selectCategorias.current.selectedIndex].dataset.id

        const p = { 'titulo': titulo, 'img_url': img_url, 'descripcion': descripcion, 'precio': precio, 'stock': stock, 'categoria': { 'id': idCategoria } }
        if(producto)p['id']=producto.id

        if (id) {//update
            const ok = await actualizarProducto(token, p)
            if (ok) {
                navigate('/productos')
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Producto actualizado con exito`,
                    confirmButtonText: 'OK'
                })
            }
        } else {//create
            const ok = await crearProducto(token, p)
            if (ok) {
                navigate('/productos')
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Producto creado con exito`,
                    confirmButtonText: 'OK'
                })
            }
        }
    }

    return (<>
        <div className="col-md-6 mt-4">

            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">{id ? 'Editar producto' : 'Crear producto'}</h3>
                </div>

                <form ref={formProducto} >
                    <div className="card-body">
                        <div className="form-group">
                            <input id="id-prod" type="hidden" name="id-producto" className="form-control" />

                            <label htmlFor="cat-titulo">Titulo</label>
                            <input id="cat-titulo" defaultValue={producto ? producto.titulo : ''} type="text" name="titulo-producto" className="form-control" placeholder="titulo" />

                            <label htmlFor="url-img">url de la imagen </label>
                            <input id="url-img" defaultValue={producto ? producto.img_url : ''} type="text" name="url-img" className="form-control" />

                            <label htmlFor="id-description">descripcion</label>
                            {/* <input id="description" defaultValue={producto?producto.descripcion:''} type="text" name="description" className="form-control" /> */}
                            <textarea id="id-description" name="n-description" className="form-control" rows={3} placeholder="Descripcion del producto" defaultValue={producto ? producto.descripcion : ''} />


                            <label htmlFor="price">precio</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input id="price" defaultValue={producto ? producto.precio : ''} type="number" name="price" className="form-control" />
                                {/* <div className="input-group-append">
                                    <span className="input-group-text">.00</span>
                                </div> */}
                            </div>


                            <label htmlFor="stock">stock</label>
                            <input id="stock" defaultValue={producto ? producto.stock : ''} type="number" name="stock" className="form-control" />


                            {/* <input id="categoria" defaultValue={producto ? producto.categoria.nombre : ''} type="text" name="categoria" className="form-control" /> */}
                            <div className="form-group">
                                <label htmlFor="id-categorias">categoria</label>
                                <select id="id-categorias" ref={selectCategorias} className="form-control">
                                    {categorias ? categorias.map((categoria, i) => {
                                        return <option key={i} data-id={categoria.id}>{categoria.nombre}</option>
                                    }) : ''}
                                </select>
                            </div>


                        </div>
                    </div>

                    <div className="card-footer">
                        <button type="submit" onClick={submitData} className="btn btn-primary">{id ? 'Actualizar' : 'Crear'}</button>
                    </div>
                </form>
            </div>
        </div>
    </>)
}
export default Producto