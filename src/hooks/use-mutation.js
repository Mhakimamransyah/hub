import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export const useMutatation = () => {

    const router = useRouter();

    const [data, setData] = useState({
        res: null,
        isLoading: false,
        isError: false,
        error : null
    });

    const mutate = useCallback(({ method, payload, url, onSuccess, headers }) => {

        setData({
            ...data,
            isLoading: true
        });
        
        fetch(url, {
            method: method,
            body: payload,
            headers: {
                ...headers,
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(response => {

            if (response === 401) {
                Cookies.remove("token");
                router.replace("/login");
            }

            return response.json();

        }).then(result => {

            if (!result.success) {
                setData({
                    ...data,
                    isError : true,
                    error : result?.message || "Something error occured"
                });
            } else {

                setData({
                    ...data,
                    res: result
                });

                if (onSuccess != undefined) onSuccess(result);
            }

        }).catch(e => {
            
            setData({
                ...data,
                isError: true,
                error : e.message || "Something error occured"
            });

        })
    });

    return { ...data, mutate };

}