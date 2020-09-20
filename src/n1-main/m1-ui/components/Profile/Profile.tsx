import React from 'react';
import s from './profile.module.css'
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../../m2-bll/store";

const Profile = () => {
    const isLogged =  useSelector<AppStateType,boolean>(state=>state.login.isLogged)
    if(!isLogged)return <Redirect to={'log-in'}/>

    return (
        <div className={s.container}>
            PROFILE
        </div>
    );
}

export default Profile;
