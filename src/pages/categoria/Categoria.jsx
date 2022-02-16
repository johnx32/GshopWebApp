import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"

const Categoria = (props) => {

    const { user:{token} } = useContext(UserContext)
    const navigate = useNavigate()
    const formCategoria = useRef()
    const { id } = useParams()
    const [categoria,setCategoria] = useState(null)

    useEffect(()=>{
        console.log('useEffect categoria')
        if(id)
            obtenerCategoriaById(id)
    },[])

    const submitData = (e)=>{
        e.preventDefault()
        var nombre=formCategoria.current.elements['nombreCategoria'].value
        
        if(id){
            // Editar
            fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/categoria`,{
                method:'PUT',
                body:JSON.stringify({'id':id,'nombre':nombre}),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+token
                })
            }).then(response=>response)
            .then(data=>{
                formCategoria.current.reset()
                navigate(-1)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Categoria "${nombre}" actualizada con exito`,
                    confirmButtonText: 'OK'
                })
            })
        }else{
            // Nuevo
            fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/categoria`,{
                method:'POST',
                body:JSON.stringify({'nombre':nombre}),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+token
                })
            }).then(response=>response)
            .then(data=>{
                console.log('data: ',data)
                formCategoria.current.reset()
                navigate(-1)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Categoria "${nombre}" creada con exito`,
                    confirmButtonText: 'OK'
                })                
            })
        }
    }

    function obtenerCategoriaById(id){
        console.log('token: ',token);
        fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/categoria/${id}`,{
            method:'GET',
            headers: new Headers({
                'Authorization':'Bearer '+token
            })
        }).then(response=>response.json())
        .then(categoria=>{
            setCategoria(categoria)
            //xCargarCategoriaAForm(categoria)
        })
    }



    return (<>
        <div className="col-md-6 mt-4">
            {/* <!-- general form elements --> */}
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">{id?'Editar categoria':'Crear Categoria'}</h3>
                </div>
                {/* <!-- form start --> */}
                <form ref={formCategoria} >
                    <div className="card-body">
                        <div className="form-group">
                            <input id="cat-id" type="hidden" name="idCategoria" className="form-control" />

                            <label htmlFor="cat-nombre">Nombre de Categoria</label>
                            <input id="cat-nombre" defaultValue={categoria?categoria.nombre:''} type="text" name="nombreCategoria" className="form-control" placeholder="Categoria" />
                        </div>
                    </div>

                    <div className="card-footer">
                        <button type="submit" onClick={submitData} className="btn btn-primary">{id?'Actualizar':'Crear'}</button>
                    </div>
                </form>
            </div>
        </div>
    </>)
}
export default Categoria