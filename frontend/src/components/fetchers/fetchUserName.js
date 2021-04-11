import React, {Component} from 'react';


const fetchUserName = () => {
    return fetch("http://127.0.0.1:8000"+"/api/currentInfo", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        },
    }).then((response) => {

        if (response.ok) {
            return response.json();
        }
        return {username: null,};
    }).then((data) => {
        // console.log(data);
        // if (data) {
        //     this.setState({
        //         username: data.username,
        //     });
        // }
        return data.username;
    });
}
export default fetchUserName;