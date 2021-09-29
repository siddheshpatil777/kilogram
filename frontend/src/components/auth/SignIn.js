// import React from 'react';
import React, {Component, useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Cookies from 'universal-cookie';


import { Snackbar} from "@material-ui/core";
// import DjangoCSRFToken from 'django-react-csrftoken'
import CSRFToken from '../utility/csrftoken';
import {useHistory} from "react-router-dom";
import {UserDataContext} from "../../contexts/UserDataContext";
import {BASE_URL} from "../METADATA";
import delay from "../utility/utility";
import {Alert} from "@material-ui/lab";
import Register from "./Register";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const SignIn = (props) => {


  const classes = useStyles();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const {setUserName, updateUserName} = useContext(UserDataContext);
    const onLoginButtonPressed = async (e) => {
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
            credentials: 'include',
        }

        // console.log(requestOptions);
        fetch(BASE_URL + "/api/auth/login", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    console.log("error");
                    setUserName(null);
                } else {
                console.log(setUserName);
                    setUserName(username);
                }
                return response.json();
            }).then((data) => {
            if (data) {
                console.log(data);
                // if (data.success === true) {
                     const cookies = new Cookies();
                    cookies.set('token', data.token, { path: '/' });
                    console.log(cookies.get('myCat')); // Pacman
                    history.push('/');
                // } else {
                    // setSnackBar({severity: "error", message: data.message});
                    // setOpen(true);
                // }
            }
        })

    }
    const goToRegisterPage=(e)=>{
         e.preventDefault();
         history.push('/register');
    }
    const onUsernameChange = (e) => {
        // e.preventDefault();
        setUsername(e.target.value);
        console.log("now user name is" + username);
    }
    const onPasswordChange = (e) => {
        // e.preventDefault();
        setPassword(e.target.value);
    }
    const [snackBar, setSnackBar] = useState({severity: "None", message: "None"});
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={onLoginButtonPressed}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="UserName"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={onUsernameChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                         onChange={onPasswordChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>


                            <Link onClick={goToRegisterPage}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
             <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackBar.severity}>
                    {snackBar.message}
                </Alert>
            </Snackbar>
        </Container>
    );

}
export default SignIn;