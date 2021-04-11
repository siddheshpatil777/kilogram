import React, {Component, useState, useContext} from 'react';
import {TextField, FormControl, FormHelperText, Grid, Button, Input} from "@material-ui/core";
// import DjangoCSRFToken from 'django-react-csrftoken'
import {UserDataContext} from "../contexts/UserDataContext";
import CSRFToken from './csrftoken';
import {Link} from "react-router-dom";

const LogoutButton = (props) => {
    const {setUserName} = useContext(UserDataContext);
    const onLogOutButtonPressed = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'X-CSRFToken': CSRFToken(),
            }
        }
        // console.log(requestOptions);
        fetch("http://127.0.0.1:8000" + "/auth/logout", requestOptions)
            .then((response) => {
                if (response.ok) {
                    console.log(response.json());
                    setUserName(null);
                } else {
                    setUserName(null);
                }
            });
    }
    return(
        <Link to="/"><Button color="inherit" onClick={onLogOutButtonPressed}>LogOut</Button></Link>
    );

}
export default LogoutButton;