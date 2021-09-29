import {useState, useEffect} from 'react';
import CSRFToken from "./csrftoken";

const useFetch = (url, method,sendData={}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    useEffect(() => {
        const abortCont = new AbortController();
        // setTimeout(() => {
            let options;
            if (method === "GET") {
                options = {
                    signal: abortCont.signal,
                    headers:{
                        // 'Access-Control-Allow-Origin':'*',
                    },
                    body:sendData,
                    credentials: "same-origin",


                };
            } else if (method === "POST") {
                options = {
                    signal: abortCont.signal,
                    method: 'POST',

                    headers: {
                        "Content-Type": 'application/json',
                        'X-CSRFToken': CSRFToken(),
                    },
                     credentials: 'include',

                    body:sendData,

                };
            }
            fetch(url, options)
                .then(res => {
                    if (!res.ok) { // error coming back from server
                        throw Error('could not fetch the data for that resource');
                    }
                    return res.json();
                })
                .then(data => {
                    console.log("FCCC",data);
                    setError(null);
                    setData(data);
                    setIsPending(false);

                })
                .catch(err => {
                    // auto catches network / connection error
                    // console
                    if (err.name === 'AbortError') {
                        console.log("fetch aborted");
                    } else {
                        setIsPending(false);
                        setError(err.message);
                    }
                })
        // }, 1000);
        return () => abortCont.abort();
    }, [url])

    return {data, isPending, error};
}

export default useFetch;