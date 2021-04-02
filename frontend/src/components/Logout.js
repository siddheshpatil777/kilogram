import React, {Component, useState} from 'react';
import {TextField, FormControl, FormHelperText, Grid, Button, Input} from "@material-ui/core";
// import DjangoCSRFToken from 'django-react-csrftoken'
import CSRFToken from './csrftoken';

const Logout = (e) => {
    e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                 'X-CSRFToken': CSRFToken(),
            }
        }
        // console.log(requestOptions);
        fetch('auth/logout', requestOptions)
            .then((response) => {
                console.log(response.json());
            });

}
export default Logout;