import React from 'react';
import s from './profile.module.css'
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {Redirect} from "react-router-dom";

const Profile = () => {
    const isLogged =  useSelector<AppStoreType,boolean>(state=>state.login.isLogged)
    if(!isLogged)return <Redirect to={'log-in'}/>

    return (
        <div className={s.container}>
            PROFILE
        </div>
    );
}

export default Profile;
