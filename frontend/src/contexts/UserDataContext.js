import React, {Component} from 'react';
import fetchUserName from "../components/fetchers/fetchUserName";
import {BASE_URL} from "../components/METADATA";
import CSRFToken from "../components/utility/csrftoken";
import Cookies from 'universal-cookie';
import {useHistory} from "react-router-dom";
import { withRouter } from "react-router-dom";
import {urlMapper,USER_URL} from '../components/utility/urlMapper';
export const UserDataContext = React.createContext({
    username: "sisdd",
    theme: 'dark',
});

class UserDataContextProvider extends Component {

    // setUserName=(username)=>{this.setState({username: username});}
    //         setUserName:this.setUserName,
    state = {
        token:null,
        username: null,
        theme: 'dark',
        updateUserName: null,
        setUserName: null,
        updateToken:null,
    }

    constructor(props) {
        super(props);
        this.updateUserName = this.updateUserName.bind(this);
        this.setUserName = this.setUserName.bind(this);
        this.updateToken = this.updateToken.bind(this);

    }

    componentWillMount() {

        // this.updateUserName();
        // console.log("fetched " + username);
        // this.setState({
        //     username:  fetchUserName(),
        // });
        console.log("sadja");
        const cookies = new Cookies();
        let token=cookies.get('token');
        console.log(token);

        fetch(urlMapper(USER_URL) , {
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
            setUserName: this.setUserName,
             updateToken: this.updateToken,
        });
    }

    async updateUserName() {
        let username = fetchUserName();
        // let username = "sid";
        this.setState({
            username: username,
        });
    }
    async updateToken(token) {
        this.setState({
            token: token,
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