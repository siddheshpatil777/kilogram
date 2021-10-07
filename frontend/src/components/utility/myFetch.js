import {useState, useEffect, useContext} from 'react';
import CSRFToken from "./csrftoken";
import Cookies from "universal-cookie";
const myFetch = (url,method,sendData = {}) => {
    console.log(url);
    const cookies = new Cookies();
    let token = cookies.get('token');
    const myHeaders = new Headers();
     myHeaders.append("Authorization", "Token " + token);

    const options = {
        method: method,
        headers: myHeaders,
        body:JSON.stringify(sendData),
    };
    return fetch(url,options);
}

export default myFetch;