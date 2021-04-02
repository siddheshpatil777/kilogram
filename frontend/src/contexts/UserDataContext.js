import React, {Component} from 'react';

export const UserDataContext = React.createContext({
        username: "sisdd",
        theme: 'dark',
    });

class UserDataContextProvider extends Component {
    state = {
        username: "sisdd",
        theme: 'dark',
    }
    constructor(props){
        super(props);


    }
    componentWillMount(){
         fetch("/api/currentInfo", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            },
        }).then((response) => {

            if (response.ok) {
                return response.json();
            }
            return {username: null,};
        }).then((data) => {
            console.log(data);
            if (data) {
                this.setState({
                    username: data.username,
                });
            }
        }).catch(error => {
            console.log(error);
            // return error;
        });
    }


    render(){
        return (
            <UserDataContext.Provider value={{...this.state}}>
                {this.props.children}
            </UserDataContext.Provider>
        );
    }
}

export default UserDataContextProvider;