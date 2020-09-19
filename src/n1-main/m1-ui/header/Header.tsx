import React from 'react';
import s from './header.module.css'

import {NavLink, Route} from "react-router-dom";
import LogIn from "../components/LogIn/LogIn";

const Header = () => {


    return (
        <div>


                    <nav>

                            <div className={s.links}>
                                <NavLink className={s.link} to={'profile'}>profile</NavLink>
                                <NavLink className={s.link} to={'create-account'}>create-account</NavLink>
                                <NavLink className={s.link} to={'log-in'}>log-in</NavLink>
                                <NavLink className={s.link} to={'log-out'}>log-out</NavLink>
                                <NavLink className={s.link} to={'forgot password?'}>forgot password?</NavLink>
                            </div>

                    </nav>



        </div>
    );
}

export default Header;
