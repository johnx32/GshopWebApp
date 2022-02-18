

    export async function obtenerCategorias(token,pagina,q){
        const response = await fetch(`${import.meta.env.VITE_URL_DOMAIN}/api/categoria?${pagina?`page=${pagina-1}`:''}${q?`&nombre=${q}`:""}`,{
                                    method:'GET',
                                    headers: new Headers({
                                        'Authorization':'Bearer '+token
                                    })
                                })
        const data = await response.json()

        return data        
    }