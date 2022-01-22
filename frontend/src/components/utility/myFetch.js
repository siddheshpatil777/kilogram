import React, { Component }  from 'react';
import {useState, useEffect, useContext} from 'react';
import CSRFToken from "./csrftoken";
import Cookies from "universal-cookie";
const myFetch = (url,method,sendData = {},shouldJsonify=true) => {
    console.log(url);
    const cookies = new Cookies();
    let token = cookies.get('token');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
    const options = {
        method: method,
        headers: myHeaders,
    };
    if(method==="POST"){
        if(shouldJsonify){
            options.body=JSON.stringify(sendData);
        }else{
            options.body=sendData;
        }

    }
    return fetch(url,options);
}
export default myFetch;