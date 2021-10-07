import React, {Component, useState, useContext} from 'react';
import {TextField, FormControl, FormHelperText, Grid, Button, Input} from "@material-ui/core";
// import DjangoCSRFToken from 'django-react-csrftoken'
import {UserDataContext} from "../../contexts/UserDataContext";
import CSRFToken from '../utility/csrftoken';
import {Link, useHistory} from "react-router-dom";
import {BASE_URL} from "../METADATA";
import Cookies from 'universal-cookie';
import myFetch from "../utility/myFetch";
const LogoutButton = (props) => {
    const {setUserName} = useContext(UserDataContext);
    const history = useHistory();
    const onLogOutButtonPressed = (e) => {
        e.preventDefault();
         setUserName(null);
         const cookies = new Cookies();
         myFetch(BASE_URL+"/api/auth/logout",'POST',{});
         cookies.set('token', "", { path: '/' });
         history.push('/login');
    }
    return (
        <Button color="inherit" onClick={onLogOutButtonPressed}>LogOut</Button>
    );

}
export default LogoutButton;