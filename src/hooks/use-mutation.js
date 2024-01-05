import { useCallback, useState } from "react";

export const useMutatation = () => {

    const [data, setData] = useState({
        res: null,
        isLoading: false,
        isError: false,
        error : null
    });

    const mutate = useCallback(({ method, payload, url, onSuccess }) => {

        setData({
            ...data,
            isLoading: true
        });
        
        fetch(url, {
            method: method,
            body: payload,
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(response => response.json()).then(result => {

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