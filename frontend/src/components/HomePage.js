import React, {Component} from 'react';
import Navbar from './Navbar';
import UserDataContext from "../contexts/UserDataContext";
import useFetch from "./useFetch";
import PostCard from "./PostCard"
import {Grid} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
class HomePage extends Component {
    // static contextType = UserDataContext;
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        console.log(" HomePage componentWillMount");

    }

    componentDidMount() {
        console.log(" HomePage componentDidMount");

    }

    componentWillUnmount() {
        console.log(" HomePage componentWillUnmount");
    }

    render() {
        // const classes = useStyles();
        // const [data, isPending, isError] = useFetch('/api/currentInfo');
        // this.context.setState({username: data.username});
        return (
            <div>

                <Grid
                    container
                    spacing={2}
                    // justify="flex-around"
                >
                    <Grid
                        container
                        xs={3}
                    />
                    <Grid
                        container
                        xs={6}
                        spacing={3}
                        justify="space-evenly"
                    >
                        <Grid item xs={12} sm={6}>
                            <PostCard/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <PostCard/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <PostCard/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <PostCard/>
                        </Grid>
                    </Grid>
                </Grid>
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