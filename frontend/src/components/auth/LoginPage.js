import React, {Component, useState, useContext} from 'react';
import {TextField, FormControl, FormHelperText, Grid, Button, Input, Snackbar} from "@material-ui/core";
// import DjangoCSRFToken from 'django-react-csrftoken'
import CSRFToken from '../utility/csrftoken';
import {useHistory} from "react-router-dom";
import {UserDataContext} from "../../contexts/UserDataContext";
import {BASE_URL} from "../METADATA";
import delay from "../utility/utility";
import {Alert} from "@material-ui/lab";
import {urlMapper,LOGIN_URL} from "../utility/urlMapper";
import Cookies from 'universal-cookie';
const LoginPage = (props) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
     const [open, setOpen] = useState(false);
    const [formUsername, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const {setUserName, username} = useContext(UserDataContext);
    // const context=useContext(UserDataContext);
    // console.log("context");
    // console.log(context);
    // if(username!=null){
    //
    // }
     history.push('/');
    const onLoginButtonPressed = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'X-CSRFToken': CSRFToken(),
            },
            body: JSON.stringify({
                'username': formUsername,
                'password': password
            }),
             credentials: 'include',
        }
        // console.log(requestOptions);
        // BASE_URL + "/auth/login"

        fetch(urlMapper(LOGIN_URL), requestOptions)
            .then((response) => {
                if (!response.ok) {
                    console.log("error");
                    setUserName(null);
                } else {
                    setUserName(formUsername);
                }
                return response.json();
            }).then((data) => {
            if (data) {
                if (data.success === true) {
                    const cookies=new Cookies();
                    cookies.set('token',data.token);
                    cookies.set('logged_in_username',data.user.username);
                    history.push('/');
                } else {
                    setSnackBar({severity: "error", message: data.message});
                    setOpen(true);
                }
            }
        })

    }
    const onUsernameChange = (e) => {
        // e.preventDefault();
        setUsername(e.target.value);
        console.log("now user name is"+formUsername);
    }
    const onPasswordChange = (e) => {
        // e.preventDefault();
        setPassword(e.target.value);
    }
    const [snackBar, setSnackBar] = useState({severity: "None", message: "None"});

    return (
        <div id="#loginPage">
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
                        <Button variant="contained" color="primary"  onClick={onLoginButtonPressed}>Login</Button>
                    </Grid>


                </Grid>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackBar.severity}>
                    {snackBar.message}
                </Alert>
            </Snackbar></div>
    );

}
export default LoginPage;