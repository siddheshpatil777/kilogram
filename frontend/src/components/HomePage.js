import React, {Component} from 'react';
import Navbar from './Navbar';
import UserDataContext from "../contexts/UserDataContext";
import useFetch from "./useFetch";

class HomePage extends Component {
    static contextType = UserDataContext;

    constructor(props) {
        super(props);

    }

    componentWillMount() {


    }

    componentDidMount() {

    }

    render() {

        // const [data, isPending, isError] = useFetch('/api/currentInfo');
        // this.context.setState({username: data.username});
        return (
            <div>
                <Navbar/>
                <h2>sd</h2>

            </div>

        );
    }
}

// HomePage.contextType = UserDataContext;
export default HomePage;
// const HomePage=(props)=>{
//     return(
//         <Grid></Grid>
//     );
// }