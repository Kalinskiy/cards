import React, {useState} from 'react';
import s from './navigation.module.css'
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutTC} from "../Login/Reducer/login-reducer";



const Navigation = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const logOutClick = async () => {
        await dispatch(logoutTC())
        history.push('/log-in')
    }

    return (
        <div>
            <nav>
                <div className={s.links}>
                    <NavLink className={s.link} to={'/profile'}>profile</NavLink>
                    <NavLink className={s.link} to={'/register'}>registration</NavLink>
                    <NavLink className={s.link} to={'/log-in'}>log-in</NavLink>
                    <NavLink onClick={logOutClick} className={s.link} to={'/log-out'}>log-out</NavLink>
                    <NavLink className={s.link} to={'/forgot'}>forgot password?</NavLink>
                    <NavLink className={s.link} to={'table'}>Table</NavLink>
                </div>
            </nav>
        </div>
    );
}


export default Navigation;


