import React, {Component} from 'react';
import fetchUserName from "../components/fetchers/fetchUserName";

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
        setUserName:null
    }

    constructor(props) {
        super(props);
        this.updateUserName=this.updateUserName.bind(this);
        this.setUserName=this.setUserName.bind(this);
    }

    componentDidMount() {
        this.setState({
            updateUserName: this.updateUserName,
            setUserName:this.setUserName
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