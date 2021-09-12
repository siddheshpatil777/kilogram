import React, {Component} from 'react';
import {BASE_URL} from "../METADATA";
import CSRFToken from "../utility/csrftoken";


const fetchUserName = () => {
    return fetch(BASE_URL+"/api/currentInfo", {
        method: "GET",
        headers: {
            "Accept": "application/json",
             'X-CSRFToken': CSRFToken(),
        },
         credentials: 'include'
    }).then((response) => {

        if (response.ok) {
            return response.json();
        }
        return {username: null,};
    });
}
export default fetchUserName;