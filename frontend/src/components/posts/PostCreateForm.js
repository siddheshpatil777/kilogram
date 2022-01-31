import React, {useState} from "react";
import {AppBar, Button, Card, Grid, Input, Paper, Snackbar, Typography, withStyles} from "@material-ui/core";
import selectMedia from "./selectMedia";
import selectMediaFilter from "./selectMediaFilter";
import {useTheme} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";
import {urlMapper, POST_CREATE_URL} from "../utility/urlMapper";
import myFetch from "../utility/myFetch";
import {Alert} from "@material-ui/lab";
const style = (theme) => ({
    root: {
        border: `8px solid ${theme.palette.common.white}`,
        margin: 16,
        padding: "36px 0 0", // background: `rgba(255, 255, 255, 0.9)`,
        boxShadow: [`0px 16px 26px -10px ${theme.palette.primary.main}99`, theme.shadows[15]],
        minHeight: "40vh",
    }, navigation: {
        width: 110, fontSize: 12, [theme.breakpoints.down("xs")]: {
            fontSize: 10, width: 90
        }
    }, prevBtn: {
        color: theme.palette.grey[700], // background: theme.palette.common.white,
        boxShadow: theme.shadows[5]
    }, imagePreview: {
        minHeight: "40vh", width: "auto"
    }, // hidden: {
    //     display: "none",
    // },
    // importLabel: {
    //     color: "black",
    // },
});

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (<div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
    >
        {value === index && (<Box p={3}>
            <Typography>{children}</Typography>
        </Box>)}
    </div>);
}

TabPanel.propTypes = {
    children: PropTypes.node, index: PropTypes.any.isRequired, value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`, 'aria-controls': `full-width-tabpanel-${index}`,
    };
}


const PostCreateForm = ({classes}) => {
    // const [formSubmitted, setFormSubmitted] = useState(false);
    // const [activeStep, setActiveStep] = useState(
    //     localStorage.getItem("step") ? Number(localStorage.getItem("step")) : 0
    // );
    // const handleChange = (index) => (e) => {
    //     setActiveStep(index);
    //     localStorage.setItem("step", index);
    // };
    // const nandleNext = () => {
    //     setActiveStep(activeStep + 1);
    //     localStorage.setItem("step", activeStep + 1);
    // };
    // const nandlePrev = () => {
    //     setActiveStep(activeStep - 1);
    //     localStorage.setItem("step", activeStep - 1);
    // };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     localStorage.clear();
    //     setFormSubmitted(true);
    //     const data = Array.from(e.target.elements)
    //         .map((el) => el.id)
    //         .filter(Boolean)
    //         .reduce((accObj, field) => {
    //             accObj[field] = e.target.elements[field].value;
    //             return accObj;
    //         }, {});
    //     alert(JSON.stringify(data, null, 2));
    // };
    const tabs = ["selectMedia", "selectMediaFilter"];
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        event.preventDefault();
        // setValue(newValue);
    };
    const [open, setOpen] = useState(false);
const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const handleBackButtonClicked = (event) => {
        event.preventDefault();
        setValue(Math.max(value - 1, 0));
    }
     const [snackBar, setSnackBar] = useState({severity: "None", message: "None"});

    
    const [content, setContent] = useState("");
    const handleCaptionChange = (event) => {
        setContent(event.target.value);
    }
    const [title, setTitle] = useState("");
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState("");
    const onFileChange = (event) => {
        const file = event.target.files[0];
        // Update the state
        // let reader = new FileReader();
        // let url = reader.readAsDataURL(file);
        const objectUrl = URL.createObjectURL(file);
        setSelectedFile(file);
        setPreview(objectUrl);
        console.log(event.target.files[0]);

    };
    const onFileUpload = (event) => {

    }
     const handleSubmitButtonClicked = (event) => {
        event.preventDefault();
        if (value === 2) {
            // const sendData={
            //     title:title,
            //     content:content,
            //     image:selectedFile,
            // };
            var sendData = new FormData()
            sendData.append('title', title);
            sendData.append('content', content);
            sendData.append('image', selectedFile);
            myFetch(urlMapper(POST_CREATE_URL),"POST",sendData,false)
                .then((res)=>{
                    if(!res.ok){
                        setSnackBar({severity: "error", message: "could not create post"});
                        return null;
                    }
                    return res.json();
                }).then((data)=>{
                    if(data){
                        setSnackBar({severity: "succes", message: "post created successfully"});
                    }
                });
        } else {
            console.log("value" + value);
            setValue(Math.min(value + 1, 2));
        }
    }
    return (

        <Paper elevation={0} className={classes.root}>
            <Grid
                item
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-end"
            >
                <Grid item xs={12}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        color="primary"
                        style={{padding: "0 8px"}}
                    >
                        Book your Appointment
                    </Typography>
                    <Typography gutterBottom>
                        This information will let us know about your preferences.
                    </Typography>
                    <form>
                        {/*index={activeStep} onChangeIndex={handleChange}*/}
                        <div className={classes.root}>
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
                            {/*<SwipeableViews*/}
                            {/*    // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}*/}
                            {/*    index={value}*/}
                            {/*    onChangeIndex={handleChangeIndex}*/}
                            {/*>*/}
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <label htmlFor="contained-button-file">
                                    <Input onChange={onFileChange} accept="image/*" id="contained-button-file"
                                           multiple type="file">
                                    </Input>
                                    <Button onClick={onFileUpload} variant="contained" component="span">
                                        Upload
                                    </Button>
                                </label>
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                <p>{preview}</p>
                                {/*<img src={preview}/>*/}
                                <Card>
                                    <CardMedia
                                        image={preview}
                                        title="Contemplative Reptile"
                                    />
                                </Card>
                            </TabPanel>
                            <TabPanel value={value} index={2} dir={theme.direction}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    value={title}
                                    required
                                    fullWidth
                                    id="title"
                                    label="title"
                                    name="title"
                                    autoFocus
                                    onChange={handleTitleChange}
                                    multiline
                                    minRows={3}
                                    maxRows={7}
                                />
                                
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    value={content}
                                    required
                                    fullWidth
                                    id="content"
                                    label="content"
                                    name="content"
                                    autoFocus
                                    onChange={handleCaptionChange}
                                    multiline
                                    minRows={3}
                                    maxRows={7}
                                />
                            </TabPanel>
                            {/*</SwipeableViews>*/}
                        </div>
                    </form>
                </Grid>

                <Grid item container alignItems="flex-end">
                    <Grid
                        container
                        item
                        xs={1}
                        justifyContent="flex-end"
                    >
                        <Button onClick={handleBackButtonClicked} color="primary">Back</Button>
                    </Grid>
                    <Grid item xs={10}>

                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            onClick={handleSubmitButtonClicked}
                            container
                            justifyContent="flex-end"
                            color="primary">
                            {(value !== 2) ? "Next" : "Submit"}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackBar.severity}>
                    {snackBar.message}
                </Alert>
            </Snackbar>
        </Paper>

    );
};
export default withStyles(style)(PostCreateForm);


