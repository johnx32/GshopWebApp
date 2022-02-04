import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider=(props)=> {

    //const [user,setUser] = useState( ()=> localStorage.getItem('user'))
    const [user,setUser] = useState( localStorage.getItem('user'))
    const navigate = useNavigate()
    
    /*( ()=>{
        var u = localStorage.getItem('user')
        if(u){
            if(!user) setUser(JSON.parse(u))
        }
    })()*/

    function initUserContex(){
        console.log('initUserContex');
        var u = localStorage.getItem('user')
        if(u) setUser(JSON.parse(u))
    }

    useEffect( ()=>{
        console.log('useEffect context render');
        /*var u = localStorage.getItem('user')
        if(u){
            //console.log('useEffect: string',typeof u);
            //console.log('useEffect: object', JSON.parse(u));
            //if(!user)
            setUser(JSON.parse(u))
        }*/
    })
    


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

    function getAllUser(getUsers){
        //console.log("token previo: ", typeof( JSON.parse(user) ) );
        //if (typeof(user)=='string') setUsuario(JSON.parse(user))
        //setUser(JSON.parse(user))
        console.log("token previo: ", user);
        //console.log("token previo: ", JSON.parse(user).token);
        /*var response = await fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/usuarios`,{
                                    method:'GET',
                                    headers: new Headers({
                                        'Content-Type': 'application/json',
                                        'Authorization':'Bearer '+user.token
                                    })
                                })
            //console.log("respuesta: ",response);
        var data = await response.json()
        return data*/
        fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/usuarios`,{
            method:'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+user.token
            })
        }).then( response =>{ 
            console.log('respuesta: ',response);
            return response.json() 
        })
        .then( data=>{
            console.log('data: ',data);
            getUsers(data) 
        })
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
        <UserContext.Provider value={ {initUserContex,user,validToken,setUsuario,createUser,getUserById,getAllUser,updateUser,deleteUser} }>
            {props.children}
        </UserContext.Provider>
    )
}