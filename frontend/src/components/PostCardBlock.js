import {Grid} from "@material-ui/core";
import PostCard from "./PostCard";
import React from "react";

const PostCardBlock=({postList})=>{
    postList.forEach((postCard)=><Grid item xs={12} sm={6}><PostCard/></Grid>);
    return(
    );
}
export default PostCardBlock;