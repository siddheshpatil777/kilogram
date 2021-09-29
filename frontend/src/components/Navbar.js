import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";
import {UserDataContext} from "../contexts/UserDataContext";
import LogoutButton from './auth/LogoutButton';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // minWidth : 20,
         width: '100%',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function NavBar() {
    const classes = useStyles();
    // const letsLogOut=(e)=>{
    //     fetch("/auth/logout", {
    //         method: "POST"
    //     }).then((response) => {
    //         if (response.ok) {
    //             return response.json();
    //         }
    //         return {username: null,};
    //     }).then((data) => {
    //         console.log(data);
    //
    //     }).catch(error => {
    //         console.log(error);
    //         // return error;
    //     });
    // }

    const {username} = useContext(UserDataContext);
    // updateUserName();

    let loginLogoutButton;
    if (username === null) {
        loginLogoutButton = <Link to="/login"><Button color="inherit">Login</Button></Link>;

    } else {
        loginLogoutButton = <LogoutButton/>
    }
    const registerButton = <Link to="/register"><Button color="inherit">Register</Button></Link>
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>{username}
                    </Typography>


                    {username === null &&
                    <div>
                        <Link to="/login"><Button color="secondary">Login</Button></Link>

                        <Link to="/register"><Button color="secondary">Register</Button></Link>
                    </div>
                    }
                    {username &&
                    <LogoutButton/>
                    }
                </Toolbar>
            </AppBar>
        </div>


    );
}
