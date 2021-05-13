import React, {useEffect, useState, useLayoutEffect, useRef} from 'react';
import clsx from 'clsx';
import {makeStyles, styled} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Snackbar} from "@material-ui/core";
import useFetch from "../utility/myFetch";
import BASE_URL from "../METADATA";
import CSRFToken from "../utility/csrftoken";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import MuiAlert from '@material-ui/lab/Alert';
import myFetch from "../utility/myFetch";
import delay from "../utility/utility";
import useStateWithPromise from "../utility/useStateWithPromise";

const useStyles = makeStyles((theme) => ({
    // root: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    // },
    margin: {
        margin: theme.spacing(1),
        color: 'red'
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Register() {
    const snackBarClasses = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }));
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const alreadyUsedUserNames = useRef(new Map());
    const alreadyUsedEmails = useRef(new Map());

    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [snackBar, setSnackBar] = useState({severity: "None", message: "None"});
    const [values, setValues] = useState({
        username: '',
        fullname: '',
        email: '',
        gender: 'female',
        password: '',
        showPassword: false,
    });
    const [fieldValidity, setFieldValidity] = useState({
        usernameValidity: false,
        emailValidity: false,
    });
    // const [usernameValidity, setUsernameValidity] = useState(false);
    // const [prevValidUsername, setPrevValidUsername] = useState("");
    // const [emailValidity, setEmailValidity] = useState(false);
    // const [userNameRequestCalled, setUserNameRequestCalled] = useState(false);
    // const [emailRequestCalled, setEmailRequestCalled] = useState(false);
    const sendRegisterRequest = () => {
        const registerData = {
            'username': values.username,
            'fullname': values.fullname,
            'email': values.email,
            'gender': values.gender,
            'password': values.password,
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'X-CSRFToken': CSRFToken(),
            },
            body: JSON.stringify(registerData),
        }
        // console.log(requestOptions);
        fetch(BASE_URL + "/auth/register", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    console.log("error");
                    return null;
                }
                return response.json();
                // history.push('/');
            }).then((data) => {
            console.log(data);
            if (data) {
                if (data.success === true) {
                    setSnackBar({severity: "success", message: data.message});
                    setTimeout(() => {
                        history.push('/');
                    }, 3000);
                } else {
                    setSnackBar({severity: "error", message: data.message});
                }
            } else {
                console.log("null data error");
                setSnackBar({severity: "error", message: "errrrrrrrorrrr"});
            }
            setOpen(true);
        });
    }

    const requestServerForValidity = async (prop, value) => {
        if (prop === 'username') {
            fetch(BASE_URL + "/api/checkUserNameExistence?username=" + value.toString())
                .then((res) => {
                    console.log(res);
                    return res.json();
                }).then(data => {
                console.log("username validity " + data.value);
                alreadyUsedUserNames.current.set(value, data.value);
                setFieldValidity({...fieldValidity, usernameValidity: data.value});
            }).catch(err => {
                console.log(err);
            });
        } else if (prop === 'email') {
            fetch(BASE_URL + "/api/checkEmailExistence?email=" + value.toString())
                .then((res) => {
                    console.log(res);
                    return res.json();
                }).then(data => {
                // console.log(data);
                console.log("email validity " + data.value);
                alreadyUsedEmails.current.set(value, data.value);
                setFieldValidity({...fieldValidity, emailValidity: data.value});
                return data.value;
            }).catch(err => {
                console.log(err);
            });
        }
    }
    const handleChange = (prop) => async (event) => {
        console.log("handled change")
        setValues({...values, [prop]: event.target.value});
    };
    useEffect(() => {
        const interval = setInterval(async () => {
            let username = values.username;
            console.log("fieldValidity.usernameValidity = " + fieldValidity.usernameValidity);
            if (alreadyUsedUserNames.current.has(username) === true) {
                if (alreadyUsedUserNames.current.get(username) !== fieldValidity.usernameValidity) {
                    setFieldValidity({
                        ...fieldValidity,
                        usernameValidity: alreadyUsedUserNames.current.get(values.username)
                    });
                }
            } else {
                await requestServerForValidity('username', values.username);
                // await usernameValidity.then((res) => {
                //     console.log("res ="+res);
                // });
                // console.log("requestServerForValidity "+usernameValidity);
                // = alreadyUsedUserNames.current.get(values.username);
                // setFieldValidity({...fieldValidity, usernameValidity: usernameValidity});
            }


            if (alreadyUsedEmails.current.has(values.email) === true) {
                if(alreadyUsedEmails.current.has(values.email) !== fieldValidity.emailValidity){
                     setFieldValidity({...fieldValidity, emailValidity: alreadyUsedEmails.current.get(values.email)});
                }
            } else {
                 await requestServerForValidity('email', values.email);

            }
            console.log("values.username = " + values.username);
            //   console.log("alreadyUsedEmails.has(values.username) = "+alreadyUsedUserNames.current.has(values.username) );
            //   console.log("alreadyUsedUserNames.get(values.username) = "+alreadyUsedUserNames.current.get(values.username) );
            // console.log("fieldValidity.usernameValidity = "+fieldValidity.usernameValidity);
            //
            console.log("values.email = " + values.email);
            //  console.log("alreadyUsedEmails.has(values.email) = "+alreadyUsedEmails.current.has(values.email) );
            //    console.log("alreadyUsedEmails.get(values.email) = "+alreadyUsedEmails.currentget(values.email) );
            // console.log("fieldValidity.emailValidit = "+fieldValidity.emailValidity);
            //  console.log(" ");
            console.log(alreadyUsedUserNames.current);
            console.log(alreadyUsedEmails.current);


        }, 3000);
        return () => clearInterval(interval);

        // if (fieldValidity.usernameValidity === false && ) {
        //     requestServerForValidity('username');
        // }
    }, [values.username, values.email]);


    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className={classes.root}>
            <div>
                <Grid
                    container
                    spacing={1}
                    direction="column"
                    justify="center"
                    alignItems="center">
                    <Grid item xs={12}>
                        <TextField
                            label="Username"
                            id="standard-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            value={values.username}
                            onChange={handleChange('username')}
                        />
                        {(fieldValidity.usernameValidity === true) ? <h1>valid</h1> : <h1>not valid</h1>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="FullName"

                            id="standard-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            value={values.fullname}
                            onChange={handleChange('fullname')}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="email "

                            id="standard-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            value={values.email}
                            onChange={handleChange('email')}
                        />
                        {(fieldValidity.emailValidity === true) ? <h1>valid</h1> : <h1>not valid</h1>}

                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={values.gender}
                                        onChange={handleChange('gender')}>

                                <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                                <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                                <FormControlLabel value="other" control={<Radio/>} label="Other"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={clsx(classes.margin, classes.textField)}>
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={sendRegisterRequest}>register</Button>
                    </Grid>

                </Grid>


            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackBar.severity}>
                    {snackBar.message}
                </Alert>
            </Snackbar>


        </div>
    );
}
