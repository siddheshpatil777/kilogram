import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {BASE_URL} from "../METADATA"
import {useParams} from "react-router-dom";
import {UserDataContext} from "../../contexts/UserDataContext";
import {Button, CardActionArea, Grid, Paper} from "@material-ui/core";
import kaguya from "../../images/kaguya.png";

const useStyles = makeStyles((theme) => ({

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    temp: {
        color: "red",
    },
    root: {
        maxWidth: "auto",
    },
    media: {
        height: 140,
    },
    profilePicCard: {
        maxWidth: 200,
        position: "relative",
        zIndex: 2,
        bottom: "70px",
        // left: "50%",
        // translateY: '-50%'
    },
    titleOnCard: {
        position:"relative",
        zIndex: 3,
        left:0,
        bottom:0,
        // marginLeft:"70",
        // transform:"translate(12,12) !important"
    },
}));
const ProfilePage = () => {
    const params = useParams();
    const pageUsername = params.username;
    const {username} = useContext(UserDataContext);
    const classes = useStyles();
    const isItMyPage = (pageUsername === username);

    console.log("params");
    // console.log(pageUsername);
    console.log(isItMyPage);

    return (
        // <Grid
        //     container
        //     direction="row"
        //     justifyContent="center"
        //     alignItems="flex-start"
        // >
        //  <Grid container item xs={6} spacing={3}>>
        //      <Paper>dadsadasdasd</Paper>
        //  </Grid>
        //
        // </Grid>
        // <div className={classes.root}>
        //     <Grid container spacing={3} justifyContent="center">
        //         {/*<Grid item xs={12}>*/}
        //         {/*  <Paper className={classes.paper}>xs=12</Paper>*/}
        //         {/*</Grid>*/}
        //         <Grid item xs={6}>
        //             <Paper className={classes.paper}>xs=6</Paper>
        //         </Grid>
        //         {/*<Grid item xs={6}>*/}
        //         {/*  <Paper className={classes.paper}>xs=6</Paper>*/}
        //         {/*</Grid>*/}
        //         {/*<Grid item xs={3}>*/}
        //         {/*  <Paper className={classes.paper}>xs=3</Paper>*/}
        //         {/*</Grid>*/}
        //         {/*<Grid item xs={3}>*/}
        //         {/*  <Paper className={classes.paper}>xs=3</Paper>*/}
        //         {/*</Grid>*/}
        //         {/*<Grid item xs={3}>*/}
        //         {/*  <Paper className={classes.paper}>xs=3</Paper>*/}
        //         {/*</Grid>*/}
        //         {/*<Grid item xs={3}>*/}
        //         {/*  <Paper className={classes.paper}>xs=3</Paper>*/}
        //         {/*</Grid>*/}
        //     </Grid>
        // </div>


        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
        >
            <Grid item xs={8} className={classes.temp}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={kaguya}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Card className={classes.profilePicCard}>
                                <CardActionArea>

                                    <CardMedia
                                        className={classes.media}
                                        image={kaguya}
                                    >

                                        {/*<Grid*/}
                                        {/*    container*/}
                                        {/*    direction="column-reverse"*/}
                                        {/*    justifyContent="flex-start"*/}
                                        {/*    alignItems="flex-start"*/}

                                        {/*>*/}
                                        {/*    <Typography item variant="h5" component="h2"*/}
                                        {/*                  className={classes.titleOnCard}>*/}
                                        {/*        Lizard*/}
                                        {/*    </Typography>*/}
                                        {/*    <Typography item variant="h5" component="h2"*/}
                                        {/*                  className={classes.titleOnCard}>*/}
                                        {/*        Lizard 2*/}
                                        {/*    </Typography>*/}

                                        {/*</Grid>*/}
                                        <CardHeader>sfsdffsdfsf</CardHeader>
                                        <CardHeader>sfsdffsdfsf</CardHeader>
                                        <CardHeader>sfsdffsdfsf</CardHeader>

                                              <Typography item variant="h5" component="h2"
                                                          className={classes.titleOnCard}>
                                                Lizard
                                            </Typography>


                                    </CardMedia>

                                </CardActionArea>

                            </Card>
                            <Typography gutterBottom variant="h5" component="h2">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Share
                        </Button>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

        </Grid>
    );
}
export default ProfilePage;