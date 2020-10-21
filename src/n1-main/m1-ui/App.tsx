import React, {useEffect} from 'react';
import './App.css';
import Header from "../Header/Header";
import {HashRouter, Route, Redirect} from "react-router-dom";
import LogIn from "../Login/LogIn";
import Profile from "../Profile/Profile";
import {RegistrationPage} from "../Registration-Page/Registration-Page";
import Forgot from "../Forgot/Forgot";
import Reset from "../Reset/Reset";
import {Table} from "../Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {Cards} from "../Cards/Cards";
import {CardGame} from "../Cards/Inner-components/Card-game/Card-game";
import {AppStateType} from "../m2-bll/store";
import {Preloader} from "../../n3-common_components/Preloader/Preloader";
import {initializeApp} from "./app-reducer";
import style from "../Table/Table.module.scss";
import {log} from "util";


const App = () => {
    const initialized = useSelector<AppStateType, boolean>(state => state.app.initialized)
    const isLogged = useSelector<AppStateType, boolean>(state => state.login.isLogged)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])
    if (!initialized) {
        return <div className={style.preloader}><Preloader/></div>
    }

    return (

        <div className="App">


           {/* {!initialized && <div className={style.preloader}><Preloader/></div>}*/}




            <HashRouter>
                {!isLogged && <Redirect to={'/log-in'}/>}
                <Header/>
                <Route path='/log-in' render={() => <LogIn/>}/>
                <Route path='/register' render={() => <RegistrationPage/>}/>
                <Route path='/forgot' render={() => <Forgot/>}/>
                <Route path='/table' render={() => <Table/>}/>
                <Route path='/set-new-password/:id' render={() => <Reset/>}/>
                <Route path='/cards/:packId' render={() => <Cards/>}/>
                <Route path='/card-game/:packId' render={() => <CardGame/>}/>
                <Route path='/profile' render={() => <Profile/>}/>
            </HashRouter>
        </div>
    );
}

export default App;
