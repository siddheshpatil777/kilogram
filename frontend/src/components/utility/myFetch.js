import {useState, useEffect} from 'react';
import CSRFToken from "./csrftoken";

const myFetch = (url,method, setMyState, sendData = {}) => {
    console.log(url);
    console.log("my fetch got called");
    // let options = {
    //     method: 'GET',
    //     headers: {
    //         "Content-Type": 'application/json',
    //     },
    //     body:JSON.stringify( {username: "adaf"})
    // };
    const options = {
        method: 'GET',
       
        headers: {
            "Content-Type": 'application/json',
            'X-CSRFToken': CSRFToken(),
        },
        body:"sdDDS",
    };
    // JSON.stringify({username:"sidd"}),
    fetch(url)
        .then(res => {
            console.log("my fetch got responded");
            if (!res.ok) { // error coming back from server
                throw Error('could not fetch the data for that resource');
            }
            return res.json();
        })
        .then(data => {
            console.log("fexistence");
            // setMyState(data);
        })
        .catch(err => {
            // auto catches network / connection error
            if (err.name === 'AbortError') {
                console.log("fetch aborted");
            }
        });
    // console.log(result);
}

export default myFetch;