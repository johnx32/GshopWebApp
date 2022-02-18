
    export async function crearProducto(token,producto){
        const response = await fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/productos`,{
                                method:'POST',
                                body:JSON.stringify(producto),
                                headers: new Headers({
                                    'Content-Type': 'application/json',
                                    'Authorization':'Bearer '+token
                                })
                            })
        const data = response.ok
        return data
    }


    export async function obtenerProductos(token,pagina,q){
        const response = await fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/productos?${pagina?`page=${pagina-1}`:''}${q?`&titulo=${q}`:""}`,{
                                    method:'GET',
                                    headers: new Headers({
                                        'Authorization':'Bearer '+token
                                    })
                                })
        const data = await response.json()
        return data        
    }

    export async function obtenerProductoById(token,id){
        const response = await fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/productos/${id}`,{
                                    method:'GET',
                                    headers: new Headers({
                                        'Authorization':'Bearer '+token
                                    })
                                })
        const data = await response.json()
        return data
    }

    export async function actualizarProducto(token,producto){
        const response = await fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/productos`,{
                                method:'PUT',
                                body:JSON.stringify(producto),
                                headers: new Headers({
                                    'Content-Type': 'application/json',
                                    'Authorization':'Bearer '+token
                                })
                            })
        const data = response.ok
        return data
    }

    export async function eliminarProductoById(token,id){
        const response = await fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/productos/${id}`,{
                                    method:'DELETE',
                                    headers: new Headers({
                                        'Authorization':'Bearer '+token
                                    })
                                })                        
        const data = response.ok
        return data
    }