import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { createContext } from "react";
import useSWR from "swr";

export const GlobalContext = createContext();

export function GlobalContextProvider({children, ...props}){
    
    const router = useRouter();

    const {data} = useSWR(
        'https://paace-f178cafcae7b.nevacloud.io/api/user/me',
        url => fetch(url,{headers : {
            Authorization : `Bearer ${Cookies.get('token')}`
        }})
        .then(async r => {

            if (r.status >= 400) {
                Cookies.remove("token");
                router.replace("/login");
                return ;
            }

            return r.json();
        }),
        {
            refreshInterval: 720000,
            revalidateOnFocus : false
        }
    );

    const logout = () => {

        fetch('https://paace-f178cafcae7b.nevacloud.io/api/logout',{
            Authorization : `Bearer ${Cookies.get('token')}`
        });

        Cookies.remove("token");
        router.replace("/login");
    };

    return (
        <GlobalContext.Provider value={{data, logout}} {...props}>
            {children}
        </GlobalContext.Provider>
    );

}