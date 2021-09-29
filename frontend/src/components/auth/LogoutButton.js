import React, {Component, useState, useContext} from 'react';
import {TextField, FormControl, FormHelperText, Grid, Button, Input} from "@material-ui/core";
// import DjangoCSRFToken from 'django-react-csrftoken'
import {UserDataContext} from "../../contexts/UserDataContext";
import CSRFToken from '../utility/csrftoken';
import {Link, useHistory} from "react-router-dom";
import {BASE_URL} from "../METADATA";
import Cookies from 'universal-cookie';
const LogoutButton = (props) => {
    const {setUserName} = useContext(UserDataContext);
    const history = useHistory();
    const onLogOutButtonPressed = (e) => {
        e.preventDefault();
        // const requestOptions = {
        //     method: 'POST',
        //     headers: {
        //         'X-CSRFToken': CSRFToken(),
        //     },
        //     credentials: 'include',
        // }
        // // console.log(requestOptions);
        // fetch(BASE_URL + "/auth/logout", requestOptions)
        //     .then((response) => {
        //         if (response.ok) {
        //             console.log(response.json());
        //             setUserName(null);
        //         } else {
        //             setUserName(null);
        //         }
        //     }).then(() => {
        //         // history.push(BASE_URL+)
        // });
        //  if (response.ok) {
        //             console.log(response.json());
        //             setUserName(null);
        //         } else {
        //
        //         }
         setUserName(null);
         const cookies = new Cookies();
         cookies.set('token', "", { path: '/' });
         history.push('/login');
    }
    return (
        <Link><Button color="inherit" onClick={onLogOutButtonPressed}>LogOut</Button></Link>
    );

}
export default LogoutButton;