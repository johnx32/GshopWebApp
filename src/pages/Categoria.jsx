import { useContext, useEffect, useRef } from "react"
import { UserContext } from "../contexts/UserContext"

const Categoria = (props) => {

    const { user:{token} } = useContext(UserContext)

    const formCategoria = useRef()//document.getElementById('form-categoria')
    //const tablaCategorias = useRef()//document.getElementById('tabla-categorias')
    const tablaCategoriasBody = useRef()//document.getElementById('tabla-categorias-body')

    const submitData = (e)=>{
        e.preventDefault()
        var nombre=formCategoria.current.elements['nombreCategoria'].value
        
        var id = formCategoria.current.elements.idCategoria.value
        if(id==null){
            fetch(`${process.env.VITE_URL_DOMAIN}/api/categoria`,{
                method:'POST',
                body:JSON.stringify({'nombre':nombre}),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+token
                })
            }).then(response=>response)
            .then(data=>{
                resetFormCategoriaValues()
                obtenerCategorias()
            })
        }else{
            fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/categoria`,{
                method:'PUT',
                body:JSON.stringify({'id':id,'nombre':nombre}),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+token
                })
            }).then(response=>response)
            .then(data=>{
                resetFormCategoriaValues()
                obtenerCategorias()
            })
        }
    }

    function mostrarListaCategorias(categorias){
        var fragListCategorias = document.createDocumentFragment()

        categorias.forEach(categoria => {
            console.log((categoria.nombre));
            var tr = document.createElement('tr')
            tr.innerHTML=`<td>${categoria.id}</td>
                          <td>${categoria.nombre}</td>
                          <td><div class='centrar width100'><button data-id='${categoria.id}' type="button" class="btn btn-delete btn-danger btn-sm">Eliminar</button></div></td>
                          <td><div class='centrar width100'><button data-id='${categoria.id}' type="button" class="btn btn-edit  btn-success btn-sm">Editar</button></div></td>`
            fragListCategorias.appendChild(tr)
        });

        tablaCategoriasBody.current.innerHTML=''
        tablaCategoriasBody.current.appendChild(fragListCategorias)
    }

    function obtenerCategorias(){
        fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/categoria`,{
            method:'GET',
            headers: new Headers({
                'Authorization':'Bearer '+token
            })
        }).then(response=>response.json())
        .then(categorias=>{
            mostrarListaCategorias(categorias)
        }).catch(err=>{
            console.log(err);
        })
    }

    function resetFormCategoriaValues(){
        formCategoria.current.reset()
        formCategoria.current.querySelector('#cat-id').removeAttribute('value')
    }

    function onClickTable(e){
        e.preventDefault()

        // click en eliminar
        if(e.target.classList.contains('btn-delete')){
            var id = e.target.dataset.id
            deleteCategoriaById(id)
        }

        // click en editar
        if(e.target.classList.contains('btn-edit')){
            var id = e.target.dataset.id
            obtenerCategoriaById(id)
        }
    }



    useEffect( ()=>{
        obtenerCategorias()
        //console.log('token: ',token)
    })

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

    function obtenerCategoriaById(id){
        fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/categoria/${id}`,{
            method:'GET',
            headers: new Headers({
                'Authorization':'Bearer '+token
            })
        }).then(response=>response.json())
        .then(categoria=>{
            CargarCategoriaAForm(categoria)
        })
    }

    function CargarCategoriaAForm(categoria){
        var inNombre=formCategoria.current.querySelector('#cat-nombre')
        var inId=formCategoria.current.querySelector('#cat-id')
        inNombre.value=categoria.nombre
        inId.value=categoria.id
    }

    




    return (<>
        <div className="col-md-6 mt-4">
            {/* <!-- general form elements --> */}
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Crear Categoria</h3>
                </div>
                {/* <!-- form start --> */}
                <form ref={formCategoria} >
                    <div className="card-body">
                        <div className="form-group">
                            <input id="cat-id" type="hidden" name="idCategoria" className="form-control" />

                            <label htmlFor="cat-nombre">Nombre de Categoria</label>
                            <input id="cat-nombre" type="text" name="nombreCategoria" className="form-control" placeholder="Categoria" />
                        </div>
                    </div>

                    <div className="card-footer">
                        <button type="submit" onClick={submitData} className="btn btn-primary">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
        {/* <!--/.col (left) --> */}


        {/* <!-- right column --> */}
        <div className="col-12">
            <div id="card-categorias" className="card">
                <div className="card-header">
                    <h3 className="card-title">Lista de categorias</h3>
                </div>
                {/* <!-- /.card-header --> */}
                <div className="card-body">
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

                        </tbody>
                        <tfoot>

                        </tfoot>
                    </table>
                </div>
            </div>
        </div>

    </>);
}
export default Categoria;