import React, {Component, useState} from 'react';
import {TextField, FormControl, FormHelperText, Grid, Button, Input} from "@material-ui/core";
// import DjangoCSRFToken from 'django-react-csrftoken'
import CSRFToken from './csrftoken';
import {useHistory} from "react-router-dom";


const LoginPage = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const onLoginButtonPressed = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'X-CSRFToken': CSRFToken(),
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            }),
        }
        // console.log(requestOptions);
        fetch('auth/login', requestOptions)
            .then((response) => {
                // if (!response.ok) {
                //     console.log("error");
                // } else {
                //     console.log("success");
                //     console.log(response.json());
                //     // props.history.push('/');
                // }
                // return response.json();
                console.log(response.json());
                props.history.push('/');
                // history.push('/');

            });

    }
    const onUsernameChange = (e) => {
        // e.preventDefault();
        setUsername(e.target.value);
    }
    const onPasswordChange = (e) => {
        // e.preventDefault();
        setPassword(e.target.value);
    }
    return (
        <form>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">

                    <FormControl>

                        <Input
                            // required={true}
                            type="text"
                            onChange={onUsernameChange}
                            defaultValue={""}
                            inputProps={{
                                style: {textAlign: "center"},
                            }}
                        />
                        <FormHelperText>
                            <div align="center">User name</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">

                    <FormControl>
                        <Input
                            required={true}
                            type="text"
                            onChange={onPasswordChange}
                            defaultValue={""}
                            inputProps={{
                                style: {textAlign: "center"},
                            }}
                        />
                        <FormHelperText>
                            <div align="center">Password</div>
                        </FormHelperText>
                    </FormControl>

                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={onLoginButtonPressed}>Login</Button>
                </Grid>


            </Grid>
        </form>

    );
}
export default LoginPage;