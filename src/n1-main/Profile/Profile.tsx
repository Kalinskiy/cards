import React, {useEffect} from 'react';
import s from './profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../m2-bll/store";
import {authTC} from "../Login/Reducer/login-reducer";

const Profile = () => {
    const isLogged =  useSelector<AppStateType,boolean>(state=>state.login.isLogged)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch (authTC())
    },[])


    if(!isLogged)return <Redirect to={'log-in'}/>


    return (
        <div className={s.container}>
            PROFILE
        </div>
    );
}

export default Profile;
