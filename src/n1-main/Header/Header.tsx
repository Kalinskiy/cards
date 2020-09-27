import React from 'react';
import s from './header.module.css'
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutTC} from "../Login/Reducer/login-reducer";

const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const logOutClick = async () => {
        await dispatch(logoutTC())
       history.push('/profile')
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
                </div>

            </nav>


        </div>
    );
}

export default Header;
