import React, {Component} from 'react';
import Navbar from './Navbar';
import UserDataContext from "../contexts/UserDataContext";
import useFetch from "./utility/useFetch";
import myFetch from "./utility/myFetch";
import PostCard from "./PostCard"
import {Grid} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import {BASE_URL} from './METADATA';
import {makeStyles} from '@material-ui/core/styles';
import {isEmpty} from './utility/utility';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Cookies from "universal-cookie";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const HomePage = () => {
    // console.log("homepage loaded");
    // const classes = useStyles();
    // const [data, isPending, isError] = useFetch('/api/currentInfo');
    // this.context.setState({username: data.username});
    const {data, isPending, error} = useFetch(BASE_URL + '/api/auth/posts');
    // myFetch
    // const allPosts =
    // console.log(data);
    // console.log(isPending);
    // const cookies = new Cookies();
    // let token = cookies.get('token');
    // console.log(token);
    // fetch(BASE_URL + "/api/auth/posts", {
    //     method: "GET",
    //     headers: {
    //         "Authorization": "Token " + token,
    //         "Accept": "application/json",
    //     },
    // }).then((response) => {
    //     console.log("got response");
    //     if (response.ok) {
    //         return response.json();
    //     }
    //     console.log(this);
    // }).then((data) => {
    //     console.log("fetcting  data=", data);
    //
    // });
    return (
        <div margin="normal">
            <Grid
                container
                spacing={1}
                margin="normal"
                // justify="flex-around"
            >

                {
                    data && data.map(function (postCard) {
                    // console.log("post card data =");
                    // console.log(postCard);
                    return (
                        <Grid
                            item xs={3}
                            sm={3}
                            key={postCard.id}
                            margin="normal"
                        >
                            <PostCard data={postCard}/>
                        </Grid>
                    )
                })}
            </Grid>
        </div>

    );

}

// HomePage.contextType = UserDataContext;
export default HomePage;
// const HomePage=(props)=>{
//     return(
//         <Grid></Grid>
//     );
// }