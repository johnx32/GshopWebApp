import { memo, useContext, useEffect, useMemo, useRef, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { TuplaData } from "../components/TuplaData"


export const Usuarios = memo((props)=> {
    const {user,validToken,createUser,getUserById,getAllUser,updateUser,deleteUser} = useContext(UserContext)
    const formUsuarios = useRef()
    const tablaUsuariosBody = useRef()
    const [usuarios,setUsuarios] = useState([])
    /*const usuariosMemo = useMemo( ()=>{
        getAllUser()
    },[user])*/

    useEffect( async()=>{
        console.log('useEffect usuarios render');
        //validToken()
        
        //setUsuarios(usuariosMemo)

        //if(typeof(user)=='object'){
            const users = await getAllUser()
            console.log('users: ',users);
            if(users){
                //console.log("usuarios: ",users);
                        //mostrarListaUsuarios(usuarios)
                //console.log('users: ',users);
            setUsuarios(users)
            }
        //}
        /*if(typeof(user)!='string')
        getAllUser( (data)=>{
            console.log("getAllUser data: ",data);
            setUsuarios(data)
        })*/
        //console.log('tok: ',user,user.token);

        /*if(!user.token) initUserContex()
        else
         if(usuarios.length<1)
        fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/usuarios`,{
            method:'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+user.token
            })
        }).then( response =>{ 
            console.log('respuesta: ',response);
            return response.json() 
        }).then( data=>{
            console.log('data: ',data);
            //if(usuarios.length<1)
                setUsuarios(data) 
        }).catch( (err)=> console.log('error',err) )*/
    },[user])

    //validToken()

    async function sendDataUser(e){
        e.preventDefault()

        var id=formUsuarios.current.elements['idUsuario'].value
        var nombre=formUsuarios.current.elements['nombreUsuario'].value
        var password=formUsuarios.current.elements['passwordUsuario'].value

        var usuario = {"username":nombre,"password":password}
        if(id){
            updateUser(usuario)
        }else{
            const ok = await createUser(usuario)
            if(ok){
                //todo:limpiar formulario
                //var usuarios = await
                getAllUser( (u)=>{
                    console.log('us',u);
                    //mostrarListaUsuarios(usuarios)
                    setUsuarios(u)
                })
            }
        }
    }

    async function onClickTableBody(e){
        
        // click en eliminar
        if(e.target.classList.contains('btn-delete')){
            var id = e.target.dataset.id
            var ok =await deleteUser(id)
            if(ok){
                //todo:limpiar formulario
                getAllUser( (u)=>{
                    console.log('us',u);
                    //mostrarListaUsuarios(usuarios)
                    setUsuarios(u)
                })
            }
        }

        // click en editar
        if(e.target.classList.contains('btn-edit')){
            var id = e.target.dataset.id
            var u = await getUserById(id)

            console.log('u: ',u);

            var inNombre=formUsuarios.current.querySelector('#us-nombre')
            var inId=formUsuarios.current.querySelector('#us-id')
            inNombre.value=u.username
            inId.value=u.id

        }
    }


    return (<>
        <div className="col-md-6 mt-4">
            {/* <!-- general form elements --> */}
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Crear Categoria</h3>
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

                        </div>
                    </div>

                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </div>
                </form>
            </div>
        </div>

        <div className="col-12">
            <div id="card-categorias" className="card">
                <div className="card-header">
                    <h3 className="card-title">Lista de categorias</h3>
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
                            {usuarios.length>0?(usuarios.map( (usuario,i)=><TuplaData key={i} usuario={usuario} /> )):null }
                        </tbody>
                        <tfoot>

                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </>)
})