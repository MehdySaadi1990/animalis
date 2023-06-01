import { useState, useEffect } from "react";

//Création du hook useFetch pour les calls API 
export function useFetch(url, token) {

    const [datas, setDatas]= useState([])
    const [error, setError] = useState(false)

    useEffect(()=>{
        if(!url) return
        async function fetchData() {
            try {
                const response= await fetch(url, {
                    method: "GET",
                    headers: {
                        'Authorization':`Bearer ${token}`,
                            }})
                const data = await response.json()
                setDatas(data)
            } catch (err) {
                console.log(err)
                setError(true)
            }
        }
        fetchData()
    },[url, token])
    return  {datas, error}
}
