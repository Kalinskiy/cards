import React, {useEffect, useState} from 'react';
import s from './profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../m2-bll/store";
import {authTC, LoginAuthStateType} from "../Login/Reducer/login-reducer";

const Profile = () => {
    const isLogged =  useSelector<AppStateType,boolean>(state=>state.login.isLogged)
    const dispatch = useDispatch()
    const [value, setValue] = useState(false)




    // useEffect(()=>{
    //     handleAuth()
    // },[])

    const handleAuth = async () => {
        await dispatch (authTC())
        setValue(true)
    }

    if(value && !isLogged) {
        return <Redirect to={'log-in'}/>
    }

    return (
        <div className={s.container}>
            PROFILE
        </div>
    );
}

export default Profile;