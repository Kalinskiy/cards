import React from 'react';
import s from './header.module.css'

import {NavLink} from "react-router-dom";

const Header = () => {


    return (
        <div>


                    <nav>

                            <div className={s.links}>
                                <NavLink className={s.link} to={'profile'}>profile</NavLink>
                                <NavLink className={s.link} to={'register'}>registration</NavLink>
                                <NavLink className={s.link} to={'log-in'}>log-in</NavLink>
                                <NavLink className={s.link} to={'log-out'}>log-out</NavLink>
                                <NavLink className={s.link} to={'forgot password?'}>forgot password?</NavLink>
                            </div>

                    </nav>



        </div>
    );
}

export default Header;
