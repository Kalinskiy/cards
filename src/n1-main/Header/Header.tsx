import React, {useEffect, useState} from 'react';
import s from './header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useHistory} from "react-router-dom";
import {logoutTC} from "../Login/Reducer/login-reducer";
import icon from '../../n2-assets/images/react_icon.png'
import commonStyle from '../../n3-common_components/CommonStyles/common.module.css'
import {AppStateType} from "../m2-bll/store";

const Header = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const logOutClick = async () => {
        await dispatch(logoutTC())
        history.push('/log-in')
    }

    const [windowScroll, setWindowScroll] = useState(window.scrollY)

    const avatar = useSelector<AppStateType, any>(state => state.login.auth.avatar)
    const isLogged = useSelector<AppStateType, any>(state => state.login.isLogged)

    const scrollDown = () => {
        setWindowScroll(window.scrollY)
    }
    useEffect(() => {
        window.addEventListener('scroll', scrollDown)
        return () => {
            window.removeEventListener('scroll', scrollDown)
        }
    }, [])

    const [hamburger, setHamburger] = useState(false)


    const getBurger = () => {
        setHamburger(!hamburger);
    }

    return (
        <section id={s.header} className={windowScroll > 50 ? s.headerScrolled : ''}>
            {/*<Navigation/>*/}
            <div className={`${commonStyle.container} ${s.header}`}>
                {
                    isLogged && <div className={s.avatar}><img src={avatar} /></div>
                }
                <div className={s.navBar}>
                    <div className={s.brand}>
                        <NavLink to={'/table'}>
                            <img src={icon} alt=""/>
                        </NavLink>
                    </div>
                    <div className={s.navList}>
                        <div className={hamburger ? s.hamburger + ' ' + s.active : s.hamburger} onClick={getBurger}>
                            <div className={s.bar}></div>
                        </div>

                        <ul onClick={getBurger} className={hamburger ? s.active : ''}>

                            <NavLink className={s.link} to={'/register'}>registration</NavLink>
                            <NavLink className={s.link} to={'/log-in'}>log-in</NavLink>
                            <NavLink onClick={logOutClick} className={s.link} to={'/log-out'}>log-out</NavLink>
                            <NavLink className={s.link} to={'/forgot'}>forgot password?</NavLink>
                            <NavLink className={s.link} to={'/table'}>Table</NavLink>
                            <NavLink className={s.link} to={'/profile'}>Profile</NavLink>
                        </ul>
                    </div>
                </div>
            </div>
        </section>


    );
}

export default Header;


