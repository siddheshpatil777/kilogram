import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import {useParams} from "react-router-dom";
import {UserDataContext} from "../../contexts/UserDataContext";
import {Button, CardActionArea, Grid} from "@material-ui/core";
import kaguya from "../../images/kaguya.png";
import useFetch from "../utility/useFetch";
import {PROFILE_URL, urlMapper} from "../utility/urlMapper";

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

// const useStyles_tabs = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: 500,
//   },
// }));

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
        minWidth: "60vw",
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
        position: "relative",
        zIndex: 3,
        left: 0,
        bottom: 0,
        // marginLeft:"70",
        // transform:"translate(12,12) !important"
    },
}));
const ProfilePage = () => {


    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const params = useParams();
    const pageUsername = params.username;
    console.log("pageUsername " + pageUsername)
    const {currrent_username} = useContext(UserDataContext);
    const classes = useStyles();
    const isItMyPage = (pageUsername === currrent_username);
    console.log("params");
    // console.log(pageUsername);
    console.log(isItMyPage);
    console.log(useFetch(urlMapper(PROFILE_URL) + "/" + pageUsername));
    const {data, isPending, error} = useFetch(urlMapper(PROFILE_URL) + "/" + pageUsername);
    // const{location,birth_date,verified,location,bio,username,followings_count}=data;

    return (

        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
        >
            <Grid item xs={8} className={classes.temp}>
                <Card className={classes.root}>

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
                                        {data && data.username}
                                    </Typography>


                                </CardMedia>

                            </CardActionArea>

                        </Card>

                        <Typography gutterBottom variant="h5" component="h2">
                            {data && data.username}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {data && data.bio}
                        </Typography>
                        <div>
                            <AppBar position="static" color="default">
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                >
                                    <Tab label="Item One" {...a11yProps(0)} />
                                    <Tab label="Item Two" {...a11yProps(1)} />
                                    <Tab label="Item Three" {...a11yProps(2)} />
                                </Tabs>
                            </AppBar>

                            <TabPanel value={value} index={0}>
                                Item One
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                        </div>

                    </CardContent>

                    <CardActions>
                        <Button size="small" color="primary">
                            Sharea
                        </Button>
                        <Button size="small" color="primary">
                            Learn MoreVer
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

        </Grid>
    );
}
export default ProfilePage;