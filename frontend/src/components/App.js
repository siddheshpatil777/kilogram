import React, {Component} from 'react';
import {render} from 'react-dom';
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import {BrowserRouter} from "react-router-dom";
import {Link, Route, Switch} from "react-router-dom";
import UserDataContextProvider, {UserDataContext} from '../contexts/UserDataContext';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Navbar from "./Navbar";
import Register from "./Register";
// const UserDataContext=React.createContext({username:null});
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <UserDataContextProvider>

                    <Navbar/>
                    <Switch>
                        <Route exact path="/">
                            <HomePage/>
                        </Route>
                        <Route exact path="/login">
                            <LoginPage props={{...this.props}}/>
                        </Route>
                        <Route exact path="/register">
                            <Register />
                        </Route>

                    </Switch>
                </UserDataContextProvider>
            </div>
        );
    }
}
// const appDiv = document.getElementById("app");
// render(<BrowserRouter>
//     <App/>
// </BrowserRouter>, appDiv);

