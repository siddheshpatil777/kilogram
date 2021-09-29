import React, {Component} from 'react';
import fetchUserName from "../components/fetchers/fetchUserName";
import {BASE_URL} from "../components/METADATA";
import CSRFToken from "../components/utility/csrftoken";
import Cookies from 'universal-cookie';
import {useHistory} from "react-router-dom";
import { withRouter } from "react-router-dom";
export const UserDataContext = React.createContext({
    username: "sisdd",
    theme: 'dark',
});

class UserDataContextProvider extends Component {

    // setUserName=(username)=>{this.setState({username: username});}
    //         setUserName:this.setUserName,
    state = {
        username: null,
        theme: 'dark',
        updateUserName: null,
        setUserName: null
    }

    constructor(props) {
        super(props);
        this.updateUserName = this.updateUserName.bind(this);
        this.setUserName = this.setUserName.bind(this);
    }

    componentDidMount() {
        // this.updateUserName();
        // console.log("fetched " + username);
        // this.setState({
        //     username:  fetchUserName(),
        // });
        console.log("sadja");
        const cookies = new Cookies();
        let token=cookies.get('token');
        console.log(token);
        fetch(BASE_URL + "/api/auth/user", {
            method: "GET",
            headers: {
                "Authorization":"Token "+token,
                "Accept": "application/json",
            },

        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            console.log(this);
            this.props.history.push('/login');
            return {username: null,};
        }).then((data) => {
            console.log("fetcting userName data=",data);
            this.setState({
                username: data.username,
            });
        });
        this.setState({
            updateUserName: this.updateUserName,
            setUserName: this.setUserName
        });
    }

    async updateUserName() {
        let username = fetchUserName();
        // let username = "sid";
        this.setState({
            username: username,
        });
    }

    async setUserName(username) {
        this.setState({
            username: username,
        });
    }

    render() {
        return (
            <UserDataContext.Provider value={{...this.state}}>
                {this.props.children}
            </UserDataContext.Provider>
        );
    }
}

export default withRouter(UserDataContextProvider);