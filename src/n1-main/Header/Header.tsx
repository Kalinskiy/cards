import React, {useEffect, useState} from 'react';
import s from './header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useHistory} from "react-router-dom";
import {logoutTC} from "../Login/Reducer/login-reducer";
import commonStyle from '../../n3-common_components/CommonStyles/common.module.css'
import {AppStateType} from "../m2-bll/store";
import defaultImage from '../../n2-assets/images/user.png'
import {Preloader} from "../../n3-common_components/Preloader/Preloader";

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
    const initialized = useSelector<AppStateType, boolean>(state => state.app.initialized)


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

            {!initialized && <Preloader/>}

            <div className={`${commonStyle.container} ${s.header}`}>

               {/* {
                    isLogged && <div className={s.avatar}>
                        <NavLink to={'/profile'}>
                            <img src={avatar || defaultImage}/>
                        </NavLink>
                    </div>
                }*/}
                <div className={s.navBar}>
                    <div className={s.navList}>
                        <div className={hamburger ? s.hamburger + ' ' + s.active : s.hamburger} onClick={getBurger}>
                            <div className={s.bar}></div>
                        </div>

                        <ul onClick={getBurger} className={hamburger ? s.active : ''}>

                            {isLogged && <NavLink className={s.link} to={'/profile'}>Profile</NavLink>}
                            {isLogged && <NavLink className={s.link} to={'/table'}>Packs</NavLink>}
                            {isLogged && <NavLink onClick={logOutClick} className={s.link} to={'/log-out'}>log-out</NavLink>}

                        </ul>


                    </div>
                </div>
            </div>
        </section>


    );
}

export default Header;


