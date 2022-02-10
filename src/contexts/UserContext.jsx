import { createContext, memo, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = memo((props)=> {

    const [user,setUser] = useState( ()=> localStorage.getItem('user'))
    //const [user,setUser] = useState( localStorage.getItem('user'))
    const navigate = useNavigate()

    useEffect( ()=>{
        console.log('useEffect context render ',user);
        var u = localStorage.getItem('user')
        if(u){
            setUser(JSON.parse(u))//aqui el dilema, se actualiza user y renderiza Usuarios
        }
    },[])

    const setUsuario = (value)=> {
        if(value){
            //console.log("token xprevio: ", value);
            localStorage.setItem('user',JSON.stringify(value))
            //console.log("token xprevio: ", value);
            setUser(value)
        }else{
            localStorage.removeItem('user')
            setUser(null)
        }
    }

    function validToken(){
        if(user.token){
            var decoded = jwt_decode(user.token)
              // JWT exp is in seconds
            if (decoded.exp * 1000 < new Date().getTime()) {
                setUser(null)
                console.log("Token expired.");
                return false
            } else {
                console.log("Valid token");   
                return true
            }
        }else{
            console.log("Token null.");
            navigate('/login')
            return false
        }
    }

    async function createUser(newUser){
        const response = await fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/usuarios`,{
                                    method:'POST',
                                    body:JSON.stringify(newUser),
                                    headers: new Headers({
                                        'Content-Type': 'application/json',
                                        'Authorization':'Bearer '+user.token
                                    })
                                })
        return response.ok
    }

    async function getUserById(id){
        var u = await   fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/usuarios/${id}`,{
                            method:'GET',
                            headers: new Headers({
                                'Authorization':'Bearer '+user.token
                            })
                        })
        var data = await u.json()
        return data
    }

    async function getAllUser(page){
        //console.log("token previo type: ", typeof(user));
        console.log('pag: ',page);
        if(typeof(user)=='object'){
            console.log('si entro');
            var response = await fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/usuarios?page=${page-1}`,{
                                        method:'GET',
                                        headers: new Headers({
                                            'Content-Type': 'application/json',
                                            'Authorization':'Bearer '+user.token
                                        })
                                    })
                //console.log("respuesta: ",response);
            var data = await response.json()
            console.log('d: ',data);
            return data
        }else{ console.log('retorno null'); return null}
    }

    async function updateUser(newUser){
        var response =await fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/usuarios`,{
                                    method:'PUT',
                                    body:JSON.stringify(newUser),
                                    headers: new Headers({
                                        'Content-Type': 'application/json',
                                        'Authorization':'Bearer '+user.token
                                    })
                                })
        return response.ok
    }

    async function deleteUser(id){
        var response =await fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/usuarios/${id}`,{
                                    method:'DELETE',
                                    headers: new Headers({
                                        'Content-Type': 'application/json',
                                        'Authorization':'Bearer '+user.token
                                    })
                                })
        return response.ok
    }

    
    return (
        <UserContext.Provider value={ {user,setUsuario,createUser,getUserById,getAllUser,updateUser,deleteUser} }>
            {props.children}
        </UserContext.Provider>
    )
})