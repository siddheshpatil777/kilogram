import {useState, useEffect, useContext} from 'react';
import CSRFToken from "./csrftoken";
import {UserDataContext} from "../../contexts/UserDataContext";
import Cookies from "universal-cookie";
import {BASE_URL} from "../METADATA";

const useFetch = (url, method, sendData = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    // const { token} = useContext(UserDataContext);
    const cookies = new Cookies();
    let token = cookies.get('token');
    console.log(token);
    console.log("url " +url);
    console.log("method "+method);

    useEffect(() => {
        const abortCont = new AbortController();
        // setTimeout(() => {
        let options;
        const myHeaders = new Headers();
        // myHeaders.append("Authorization", "Token " + token);
        // myHeaders.append("Access-Control-Allow-Origin","*");
        if (method === "GET") {
            options = {
                signal: abortCont.signal,
                Authorization: "Token " + token,
                headers: {
                    "Authorization": "Token 5c8a07d7b84fc386ebdb445ac0d632a0c5ae6743",
                    "Accept": "application/json",
                },
                body: sendData,
            };

        } else if (method === "POST") {
            options = {
                signal: abortCont.signal,
                method: 'POST',
                Authorization: "Token " + token,

                headers: {
                    "Content-Type": 'application/json',
                    'X-CSRFToken': CSRFToken(),

                },
                credentials: 'include',

                body: sendData,

            };
        }
        console.log("fetching post");
        fetch(url, options)
            .then(res => {
                console.log("FCCC", res);
                if (!res.ok) { // error coming back from server
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                console.log("FCCC", data);
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