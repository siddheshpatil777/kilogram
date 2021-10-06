import {useState, useEffect, useContext} from 'react';
import CSRFToken from "./csrftoken";
import {UserDataContext} from "../../contexts/UserDataContext";
import Cookies from "universal-cookie";
import {BASE_URL} from "../METADATA";
//
// const useFetch = (url, method, sendData = {}) => {
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);
//     const [isPending, setIsPending] = useState(true);
//     // const { token} = useContext(UserDataContext);
//     const cookies = new Cookies();
//     let token = cookies.get('token');
//     console.log(token);
//     console.log("url " + url);
//     console.log("method " + method);

//     useEffect(() => {
//         const abortCont = new AbortController();
//         let options;
//         const myHeaders = new Headers();
//         myHeaders.append("Authorization", "Token " + token);
//         // myHeaders.append("Access-Control-Allow-Origin","*");
//         if (method === "GET") {
//             options = {
//                 signal: abortCont.signal,
//                 method: 'GET',
//                 headers: myHeaders,
//                 body: sendData,
//             };
//         }
//         fetch(url, options)
//             .then(res => {
//                 console.log("FCCC", res);
//                 if (!res.ok) { // error coming back from server
//                     throw Error('could not fetch the data for that resource');
//                 }
//                 return res.json();
//             })
//             .then(data => {
//                 console.log("FCCC", data);
//                 setError(null);
//                 setData(data);
//                 setIsPending(false);
//
//             })
//             .catch(err => {
//                 // auto catches network / connection error
//                 // console
//                 if (err.name === 'AbortError') {
//                     console.log("fetch aborted");
//                 } else {
//                     setIsPending(false);
//                     setError(err.message);
//                 }
//             })
//         // }, 1000);
//         return () => abortCont.abort();
//     }, [url])
//
//     return {data, isPending, error};
// }
const useFetch = (url) => {
    const abortCont = new AbortController();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const myHeaders = new Headers();
    const cookies = new Cookies();
    let token = cookies.get('token');
    // console.log(token);
    // console.log("url " + url);
    // console.log("method " + method);
    myHeaders.append("Authorization", "Token " + token);
    let options = {
        method: 'GET',
        signal: abortCont.signal,
        headers: myHeaders
    };
    useEffect(() => {
        setLoading('loading...')
        setData(null);
        setError(null);
        fetch(url, options)
            .then(res => {
                // console.log("data post=");
                // console.log(res.json());
                setLoading(false);
                //checking for multiple responses for more flexibility
                //with the url we send in.
                // res.data.content && setData(res.data.content);
                // res.content && setData(res.content);
                return res.json();
            }).then(data => {
                if(data){
                    setData(data);
                    console.log(data);
                }
        })
            .catch(err => {
                setLoading(false)
                setError('An error occurred. Awkward..')
            })
        return () => abortCont.abort();
    }, [url])

    return {data, loading, error}
};


export default useFetch;