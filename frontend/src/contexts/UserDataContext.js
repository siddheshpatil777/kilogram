import React, {Component} from 'react';
import fetchUserName from "../components/fetchers/fetchUserName";
import BASE_URL from "../components/METADATA";
import CSRFToken from "../components/utility/csrftoken";

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
        fetch(BASE_URL + "/api/currentInfo", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                 'X-CSRFToken': CSRFToken(),
            },
            credentials: "include",
        }).then((response) => {

            if (response.ok) {
                return response.json();
            }
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

export default UserDataContextProvider;