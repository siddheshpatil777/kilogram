import {Paper} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Fragment} from "react/cjs/react.production.min";
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import {Link} from "react-router-dom";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    userName: {
        fontWeight: "700",
        color: "black",
        textDecoration: "none",
    },
    commentLiked: {
        // color:"red",
    },
    commentContent: {
        // color:"red",
         fontSize: "0.9rem",
         fontWeight: "300",

    },
    timestamp: {
        fontWeight: "100",
        fontSize: "0.7rem",
    },

}));
const MyComment = ({data, mapForTcom, level}) => {
    let isLiked = true;
    const classes = useStyles();
    let spacing = "";
    if (level == 1) {
        spacing = (<Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>);
    }
    // console.log(data.date_posted);
    let today = Date.now();
    let commentDate = Date.parse(data.date_posted);
    let elaspedTime = today - commentDate;
    elaspedTime = elaspedTime / (1000.0 * 60.0);
    let timeSinceCommentPosted = "";
    if (elaspedTime < 1.0) {

        timeSinceCommentPosted = "just now";
    } else if (1.0 <= elaspedTime && elaspedTime < 60.0) {
        elaspedTime = elaspedTime | 0;
        timeSinceCommentPosted = elaspedTime + "minutes ago";
    } else if (60.0 <= elaspedTime && elaspedTime < 1440.0) {
        elaspedTime = elaspedTime / 60.0;
        elaspedTime = elaspedTime | 0;
        timeSinceCommentPosted = elaspedTime + "hours ago";
    } else if (1440.0 <= elaspedTime && elaspedTime < 565110.0) {

        elaspedTime = elaspedTime / 60.0;
        elaspedTime = elaspedTime / 24.0;
        elaspedTime = elaspedTime | 0;
        timeSinceCommentPosted = elaspedTime + " days ago";
    } else {
        // elaspedTime=elaspedTime/60.0;
        // elaspedTime=elaspedTime | 0;
        timeSinceCommentPosted = "long time ago";
    }


    return (
        <div>
            <Grid container direction="row">
                <Grid item container xs={11}>
                    <Typography fontWeight="fontWeightBold" item noWrap className={classes.userName}>
                        {spacing}<Link className={classes.userName}
                                       to={"/profile/" + data.author_name}>{data.author_name}</Link>&nbsp;
                    </Typography>
                    <Typography fontWeight="fontWeightMedium" item noWrap className={classes.commentContent}>

                        {data.content}
                    </Typography>
                </Grid>
                <Grid item container xs={1}>
                    {(isLiked === true) ?
                        <FavoriteIcon color="secondary" classes={classes.commentLiked} fontSize="small"/> :
                        <FavoriteBorderIcon item fontSize="small"/>}
                </Grid>
                <Typography fontWeight="fontWeightSmall" item noWrap className={classes.timestamp}>
                    {spacing}{timeSinceCommentPosted}
                </Typography>


                {/*<Grid item container direction="row-reverse">*/}
                {/*    <FavoriteBorderIcon item fontSize="small"/>*/}
                {/*</Grid>*/}
            </Grid>
            {/*<Grid container direction="row" justifyContent="flex-start">*/}

            {/*    <Typography fontWeight="fontWeightBold" item noWrap className={classes.userName}>*/}
            {/*        {spacing}<Link className={classes.userName}*/}
            {/*                       to={"/profile/" + data.author_name}>{data.author_name}</Link>&nbsp;*/}

            {/*    </Typography>*/}
            {/*    <Typography fontWeight="fontWeightMedium" item noWrap>*/}
            {/*        {data.content}*/}
            {/*    </Typography>*/}
            {/*    <Grid item container direction="row-reverse">*/}
            {/*        <FavoriteBorderIcon item fontSize="small"/>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}

            {/*<Typography noWrap>*/}
            {/*    text1*/}
            {/*    <Typography noWrap>*/}
            {/*        text2*/}
            {/*    </Typography>*/}
            {/*</Typography>*/}

            {/*<Paper elevation={3}>*/}
            {/*<Box textAlign="left" fontWeight="fontWeightMedium" >*/}
            {/*     <div> </div>  {data.content}*/}
            {/*</Box>*/}
            {/*<p></p>*/}

            {mapForTcom.has(data.id) && mapForTcom.get(data.id).map((comment) => {
                if (level == 0) {
                    return (
                        <MyComment key={comment.id} data={comment} mapForTcom={mapForTcom} level={level + 1}/>
                    );
                }
            })}
            {/*</Paper>*/}
        </div>
    );


}
export default MyComment;