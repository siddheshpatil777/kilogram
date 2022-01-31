import React, {useState} from 'react';

import useFetch from "../utility/useFetch";
import MyComment from "./MyComment";
import {COMMENT_SECTION_URL,COMMENT_URL, POST_CREATE_URL, urlMapper} from "../utility/urlMapper";
import {Button, Grid, TextField} from "@material-ui/core";
import myFetch from "../utility/myFetch";

const CommentSection = ({post_id}) => {
    console.log("search for post id " + post_id);
    const {data, isPending, error} = useFetch(urlMapper(COMMENT_SECTION_URL) + "/" + post_id);
    const [commentWriteBoxStatus, setCommentWriteBoxStatus] = useState(null);
    const [replyData, setReplyData] = useState({parent_comment_id:-1,content:""});
    const onPostButtonClicked = (e) => {
        e.preventDefault();
        var sendData = new FormData()
        sendData.append('post_id', post_id);
        sendData.append('parent_comment_id', replyData.parent_comment_id);
        sendData.append('content', replyData.content);
        myFetch(urlMapper(COMMENT_URL), "POST", sendData, false)
            .then((res) => {
                if (!res.ok) {
                    // setSnackBar({severity: "error", message: "could not create post"});
                    return null;
                }
                return res.json();
            }).then((data) => {
            if (data) {
                // setSnackBar({severity: "succes", message: "post created successfully"});
            }
        });
    }
    const onChangeReplyText = (e) => {
        e.preventDefault();
        setReplyData({...replyData,content:e.target.value});
    }
    if (isPending) {
        return <h3>loading</h3>;
    }
    if (error) {
        return <h3>There was Error</h3>
    }
    if (data) {
        console.log("data recieved from coment section");
        console.log(data);
        data.sort((a, b) => {
            let a_date = new Date(a.date_posted);
            let b_date = new Date(b.date_posted);
            return a < b;
        });
        data.forEach((comment) => {
            // console.log(comment);
            comment.child = [];
        });
        let map = new Map();
        // parent=[];
        // for(let i=0;i<date.length;i++){
        //     parent.push([]);
        // }
        data.forEach((comment) => {
            if (map.has(comment.parent) === true) {
                let commentArray = map.get(comment.parent);
                commentArray.push(comment);
                map.set(comment.parent, commentArray);
            } else {
                map.set(comment.parent, [comment]);
            }
        });
        // console.log(data);
        // console.log(map);
        const mainComments = map.get(0);
        console.log("mainComments =");
        console.log(mainComments);

        // {(commentWriteBoxStatus===null)?"":CommentBox}
        if (mainComments) {
            return (
                mainComments.map((comment) => {
                    return (
                        <div>
                            <MyComment key={comment.id} data={comment} mapForTcom={map} level={0}/>
                        </div>
                    )
                })

            );
        }

    }
    return (
        // {CommentBox}
        <div>
            <Grid container>
                <Grid item xs={10}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        value={replyData.content}
                        required
                        fullWidth
                        id="reply"
                        label="reply"
                        name="reply"
                        autoFocus
                        onChange={onChangeReplyText}
                        multiline
                        minRows={1}
                        maxRows={1}
                    />
                </Grid>
                <Grid
                    container
                    item
                    xs={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                >
                    <Button item onClick={onPostButtonClicked}>
                        Post
                    </Button>
                </Grid>
                {/*<Grid >*/}
                {/*   */}
                {/*</Grid>*/}
            </Grid>

            <h3>be the first to post comment</h3>
        </div>

    );
};
export default CommentSection;