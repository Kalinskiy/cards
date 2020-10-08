import React from 'react';
import s from './header.module.css'
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutTC} from "../Login/Reducer/login-reducer";
import Navigation from "../Navigation/Navigation";

const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const logOutClick = async () => {
        await dispatch(logoutTC())
        history.push('/log-in')
    }

    return (
        <div>
            <Navigation/>
        </div>
    );
}

export default Header;


