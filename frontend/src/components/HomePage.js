import React, {Component} from 'react';
import Navbar from './Navbar';
import UserDataContext from "../contexts/UserDataContext";
import useFetch from "./utility/useFetch";
import PostCard from "./PostCard"
import {Grid} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import BASE_URL from './METADATA';
import {makeStyles} from '@material-ui/core/styles';
import {isEmpty} from './utility/utility';

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
const HomePage = () => {
    // const classes = useStyles();
    // const [data, isPending, isError] = useFetch('/api/currentInfo');
    // this.context.setState({username: data.username});
    const {data, isPending, error} = useFetch(BASE_URL + '/api/posts');
    // const allPosts =
        // console.log(data);
    // console.log(isPending);
    return (
        <div>
            <Grid
                container
                spacing={1}
                // justify="flex-around"
            >
                <Grid
                    container
                    xs={3}
                />
                {data && data.map(function (postCard) {
                    // console.log("post card data =");
                    // console.log(postCard);
                    return (
                        <Grid item xs={3} sm={3} key={postCard.id}>
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