import React, { Component }  from 'react';

import useFetch from "../utility/useFetch";
import {BASE_URL} from "../METADATA";
import MyComment from "./MyComment";
import {urlMapper,COMMENT_SECTION_URL} from "../utility/urlMapper";

const CommentSection = () => {
    const {data, isPending, error} = useFetch(urlMapper(COMMENT_SECTION_URL));
    if (isPending) {
        return <h3>loading</h3>;
    }
    if (error) {
        return <h3>There was Error</h3>
    }
    if (data) {
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
        return (
            mainComments.map((comment) => {
                return (
                    <div>
                        <MyComment key={comment.id} data={comment} mapForTcom={map} level={0}/>
                    </div>
                )
            })
            // <h3>sdfds</h3>
        );

    }
     return (

            <h3>sdfds</h3>
        );

}
export default CommentSection;