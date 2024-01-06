import Cookies from "js-cookie";
import useSWR from "swr";

export default function UseQuery(url){

    const {error, data, isLoading} = useSWR(
        url,
        (url) => fetch(url,{
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`
            }
        }).then(async res => {
            
            if(res.status === 401){
                console.log("logout sih ini");
            }

            if(res.status > 401) throw(await res.json());
            
            return res.json();
    
        })
    );

    return {...data, error, isLoading};

}