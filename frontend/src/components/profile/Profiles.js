import React from "react";
import {
  useRouteMatch
} from "react-router-dom";
import ProfilePage from './ProfilePage';

const Profiles=()=>{
     const match = useRouteMatch();
     console.log(match);
    return(
        <ProfilePage/>
    );
}
export default Profiles;