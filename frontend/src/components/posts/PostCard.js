import React, {useState} from 'react';
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
import postCardImage from '../temp.png';
import CommentSection from './CommentSection';
import {BASE_URL} from "../METADATA"
import useFetch from "../utility/useFetch";
import CSRFToken from "../utility/csrftoken";
import myFetch from "../utility/myFetch";
import {POST_DISLIKE_URL, POST_LIKE_URL, urlMapper} from "../utility/urlMapper";
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    likedButtonColor: {
        backgroundColor: red[500],
    },
}));

export default function PostCard({data}) {
    // {title,content,date_posted,author}
    const {author, content, date_posted, id, title, views} = data;
    const [isLiked,setIsLiked]=useState(data.is_liked);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const likeThisPost = () => {
        myFetch(urlMapper(POST_LIKE_URL),"POST",{"post_id": id})
            .then(res=>{
                if(res.ok){
                    setIsLiked(true);
                }
            });
    };
    const dislikeThisPost = () => {
        myFetch(urlMapper(POST_DISLIKE_URL), "POST",{"post_id": id}).then(res=>{
                if(res.ok){
                    setIsLiked(false);
                }
            });
    };
    const handleLikeButtonPressed = (e) => {
        e.preventDefault();
        if (isLiked === true) {
            dislikeThisPost();
        } else {
            likeThisPost();
        }
    };
    // console.log(data);
    // return(<h1>hello</h1>);
    const likedButtonColor = (isLiked) ? "#ba2c73" : "#";
    // console.log(author, content, date_posted, id, isLiked, title, views);
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={title}
                subheader={date_posted}
            />
            <CardMedia
                className={classes.media}
                image={postCardImage}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {/*{content}*/}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={handleLikeButtonPressed}>
                    <FavoriteIcon color={(isLiked ? "secondary" : "")}/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>

                    <Typography paragraph>
                        {content}

                    </Typography>
                    <CommentSection/>

                </CardContent>
            </Collapse>
        </Card>
    );
}
