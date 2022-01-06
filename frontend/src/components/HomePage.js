import React, {Component} from 'react';
import Navbar from './Navbar';
import UserDataContext from "../contexts/UserDataContext";
import useFetch from "./utility/useFetch";
import myFetch from "./utility/myFetch";
import PostCard from "./posts/PostCard"
import {Grid} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import {BASE_URL} from './METADATA';
import {makeStyles} from '@material-ui/core/styles';
import {isEmpty} from './utility/utility';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Cookies from "universal-cookie";
import {POSTS_URL, urlMapper} from "./utility/urlMapper";

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
// BASE_URL + '/api/auth/posts'
    const {data, isPending, error} = useFetch(urlMapper(POSTS_URL));
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
        <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="center"
        >
            <Grid
                container
                xs={4}
                spacing={2}
                margin="normal"
                item
            >

                {
                    data && data.map(function (postCard) {
                        // console.log("post card data =");
                        // console.log(postCard);
                        return (
                            <Grid
                                item
                                xs={12}
                                key={postCard.id}
                                margin="normal"
                            >
                                <PostCard data={postCard}/>
                            </Grid>
                        )
                    })}
            </Grid>
        </Grid>


    );

}

// HomePage.contextType = UserDataContext;
export default HomePage;
// const HomePage=(props)=>{
//     return(
//         <Grid></Grid>
//     );
// }