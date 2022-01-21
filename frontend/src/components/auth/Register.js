import React, {useEffect, useState, useLayoutEffect, useRef} from 'react';
import clsx from 'clsx';
import {makeStyles, styled, withStyles} from '@material-ui/core/styles';
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
import {BASE_URL} from "../METADATA";
import CSRFToken from "../utility/csrftoken";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import MuiAlert from '@material-ui/lab/Alert';
import myFetch from "../utility/myFetch";
import delay from "../utility/utility";
import useStateWithPromise from "../utility/useStateWithPromise";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import {urlMapper,EMAIL_EXISTENCE_URL, REGISTER_URL, USERNAME_EXISTENCE_URL} from "../utility/urlMapper";

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
    allTextBlack: {
        color: "black",
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        // '& label.Mui-focused': {
        //     color: 'green',
        // },
        // '& .MuiInput-underline:after': {
        //     borderBottomColor: 'green',
        // },
        // '& .MuiOutlinedInput-root': {
        //     '& fieldset': {
        //         borderColor: 'red',
        //     },
        //     '&:hover fieldset': {
        //         borderColor: 'yellow',
        //     },
        //     '&.Mui-focused fieldset': {
        //         borderColor: 'green',
        //     },
        // },
    },
    valid: {
        borderColor: 'green',
    },
    invalid: {
        borderColor: 'red',
    },
}));


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'green',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },
        },
    },
})(OutlinedInput);


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
    const [values, setValues] = useStateWithPromise({
        username: '',
        fullname: '',
        email: '',
        gender: 'female',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    //   const [values, setValues] = useState({
    //     username: '',
    //     fullname: '',
    //     email: '',
    //     gender: 'female',
    //     password: '',
    //     showPassword: false,
    //     usernameValidity: false,
    //     emailValidity: false,
    // },(data)=>{
    //       console.log(data);
    //   });
    const [fieldValidity, setFieldValidity] = useState({
        usernameValidity: false,
        emailValidity: false,
    });
    const [usernameValidity, setUsernameValidity] = useState(true);
    const [emailValidity, setEmailValidity] = useState(true);
    const sendRegisterRequest = (e) => {
        e.preventDefault();
        const registerData = values;
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'X-CSRFToken': CSRFToken(),
            },
            body: JSON.stringify(registerData),
        }
        // console.log(requestOptions);

        fetch(urlMapper(REGISTER_URL), requestOptions)
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
                setSnackBar({severity: "success", message: "account created successfully"});
                setTimeout(() => {
                    history.push('/login');
                }, 3000);

            } else {
                console.log("null data error");
                setSnackBar({severity: "error", message: "invalid credentials"});
            }
            setOpen(true);
        });
    }

    const requestServerForValidity = async (prop, value) => {
        if (prop === 'username') {
            const requestOptions = {
                method: 'GET',
            }
            fetch(urlMapper(USERNAME_EXISTENCE_URL)+"?username=" + value.toString(), requestOptions)
                .then((res) => {
                    console.log(res);
                    return res.json();
                }).then(data => {
                console.log("username validity " + data.value);
                alreadyUsedUserNames.current.set(value, data.value);
                setFieldValidity({...fieldValidity, usernameValidity: data.value});
                // setValues({...values, usernameValidity: data.value});
                setUsernameValidity(data.value);

            }).catch(err => {
                console.log(err);
            });
        } else if (prop === 'email') {
            const requestOptions = {
                method: 'GET',
            }
            fetch(urlMapper(EMAIL_EXISTENCE_URL) + "?email=" + value.toString(), requestOptions)
                .then((res) => {
                    console.log(res);
                    return res.json();
                }).then(data => {
                // console.log(data);
                console.log("email validity " + data.value);
                alreadyUsedEmails.current.set(value, data.value);
                // setFieldValidity({...fieldValidity, emailValidity: data.value});
                setEmailValidity(alreadyUsedEmails.current.get(data.value));
                // setValues({...values, emailValidity: data.value});
                return data.value;
            }).catch(err => {
                console.log(err);
            });
        }
    }
    const handleChange = (prop) => async (event) => {
        setValues({...values, [prop]: event.target.value}).then(data => {
            console.log(data.username);
            console.log("handled change");
            console.log(data);
            console.log(alreadyUsedUserNames);
            let username = data.username;
            if (alreadyUsedUserNames.current.has(username) === true) {
                // setValues({...values, usernameValidity: alreadyUsedUserNames.current.get(username)});
                // setFieldValidity({
                //     ...fieldValidity,
                //     usernameValidity: alreadyUsedUserNames.current.get(username)
                // });
                setUsernameValidity(alreadyUsedUserNames.current.get(username));
            } else {
                requestServerForValidity('username', username);
            }

            let email = data.email;
            if (alreadyUsedEmails.current.has(email) === true) {
                if (alreadyUsedEmails.current.has(email) !== email) {
                    // setValues({...values, emailValidity: alreadyUsedEmails.current.get(email)});
                    //
                    // setFieldValidity({
                    //     ...fieldValidity,
                    //     emailValidity: alreadyUsedEmails.current.get(email)
                    // });
                    setEmailValidity(alreadyUsedEmails.current.get(email));
                }
            } else {
                requestServerForValidity('email', email);
            }
        });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} noValidate onSubmit={sendRegisterRequest}>
                    <TextField
                        // className={clsx((usernameValidity===true?classes.valid:classes.invalid))}
                        className={clsx(classes.textField)}
                        error={!usernameValidity}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="UserName"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={handleChange('username')}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="fullname"
                        label="Full Name"
                        name="fullname"
                        autoComplete="fullname"
                        autoFocus
                        onChange={handleChange('fullname')}
                    />
                    <TextField
                        error={!emailValidity}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        id="email"
                        autoComplete="current-email"
                        onChange={handleChange('email')}
                    />
                    <FormControl margin="normal" fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput

                            fullWidth
                            margin="normal"
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.textField)} component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={values.gender} onChange={handleChange('gender')}>
                            <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                            <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                            <FormControlLabel value="other" control={<Radio/>} label="Other"/>
                        </RadioGroup>
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Register
                    </Button>

                </form>
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackBar.severity}>
                    {snackBar.message}
                </Alert>
            </Snackbar>
        </Container>

    );
}
