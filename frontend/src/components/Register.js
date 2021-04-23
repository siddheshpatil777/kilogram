import React, {useState} from 'react';
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
import {Grid, Snackbar} from "@material-ui/core";
import useFetch from "./myFetch";
import BASE_URL from "./METADATA";
import CSRFToken from "./csrftoken";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import MuiAlert from '@material-ui/lab/Alert';

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
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [snackBar,setSnackBar]=useState({severity:"None",message:"None"});
    const [values, setValues] = useState({
        username: '',
        fullname: '',
        email: '',
        gender: '',
        password: '',
        showPassword: false,
    });
    const usernameValidator = (value) => {
        for (const ch in value) {
            if (!('a' <= ch <= 'z' || 'A' <= ch <= 'Z' || '0' <= ch <= '0' || ch != ' ')) {
                return false;
            }
        }
        return true;
    }
    const fullNameValidator = (value) => {
        for (const ch of value) {
            if (!('a' <= ch <= 'z' || 'A' <= ch <= 'Z')) {
                return false;
            }
        }
        return true;
    }
    // const checkEmailExistence = () => {
    //     const {data, isPending, error} = useFetch(BASE_URL + '/api/checkEmailExistence');
    // }
    const sendRegisterRequest = () => {
        const registerData = {
            'username': values.username,
            'fullname': values.fullname,
            'email': values.email,
            'gender': values.gender,
            'password': values.password,
        }
        // const {data,isPending,error} = useFetch(BASE_URL+'/auth/register',registerData);
        // console.log(data);
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
                    setSnackBar({severity: "success",message:data.message});
                     setTimeout(()=>{
                         history.push('/');
                     },3000);
                }
                else{
                    setSnackBar({severity: "error",message:data.message});
                }
            } else {
                console.log("null data error");
                setSnackBar({severity: "error",message:"errrrrrrrorrrr"});
            }
            setOpen(true);
        });
    }
    const [usernameValidity, setUsernameValidity] = useState(false);
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setemail] = useState('');
    const handleChange = (prop) => (event) => {
        console.log(prop);
        setValues({...values, [prop]: event.target.value});
        if (prop === 'username') {

        }
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // function onUserNameChange(e) {
    //     console.log(classes);
    //     let enteredUserName=e.target.value;
    //     if(enteredUserName.length>0 && enteredUserName==="e"){
    //         setUsernameValidity(false);
    //     }
    //     else{
    //           setUsernameValidity(true);
    //     }
    //     setUsername(e.target.value);
    // }

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
                    </Grid>
                     <Grid item xs={12}>
                        <TextField
                            label="gender"

                            id="standard-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            value={values.gender}
                            onChange={handleChange('gender')}
                        />
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
                    {/*<Grid item xs={12}>*/}
                    {/*    <FormControl fullWidth className={classes.margin}>*/}
                    {/*        <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>*/}
                    {/*        <Input*/}
                    {/*            id="standard-adornment-amount"*/}
                    {/*            value={values.amount}*/}
                    {/*            onChange={handleChange('amount')}*/}
                    {/*            startAdornment={<InputAdornment position="start">$</InputAdornment>}*/}
                    {/*        />*/}
                    {/*    </FormControl>*/}
                    {/*</Grid>*/}
                </Grid>


            </div>
            {/*<Button variant="outlined" onClick={handleClick}>*/}
            {/*    Open success snackbar*/}
            {/*</Button>*/}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackBar.severity}>
                    {snackBar.message}
                </Alert>
            </Snackbar>
            {/*<Alert severity="error">This is an error message!</Alert>*/}
            {/*<Alert severity="warning">This is a warning message!</Alert>*/}
            {/*<Alert severity="info">This is an information message!</Alert>*/}
            {/*<Alert severity="success">This is a success message!</Alert>*/}

        </div>
    );
}
