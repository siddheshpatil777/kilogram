import React, {Component} from 'react';
import {BASE_URL} from "../METADATA";
import CSRFToken from "../utility/csrftoken";
import {CURRENT_INFO_URL, urlMapper} from "../utility/urlMapper";


const fetchUserName = () => {
    return fetch(urlMapper(CURRENT_INFO_URL), {
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