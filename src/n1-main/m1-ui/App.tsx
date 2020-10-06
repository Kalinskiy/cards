import React, {useEffect} from 'react';
import './App.css';
import Header from "../Header/Header";
import {HashRouter, Route} from "react-router-dom";
import LogIn from "../Login/LogIn";
import Profile from "../Profile/Profile";
import {RegistrationPage} from "../Registration-Page/Registration-Page";
import Forgot from "../Forgot/Forgot";
import Reset from "../Reset/Reset";
import {Table} from "../Table/Table";
import {authTC} from "../Login/Reducer/login-reducer";
import {useDispatch} from "react-redux";
import {Cards} from "../Cards/Cards";
import {CardGame} from "../Cards/Inner-components/Card-game/Card-game";


const App = () => {

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch (authTC())
    },[])

    return (
        <div className="App">
            <HashRouter>
                <Header/>
                <Route path='/log-in' render={() => <LogIn/>}/>
                <Route path='/profile' render={() => <Profile/>}/>
                <Route path='/register' render={() => <RegistrationPage/>}/>
                <Route path='/forgot' render={() => <Forgot/>}/>
                <Route path='/table' render={() => <Table/>}/>
                <Route path='/set-new-password/:id' render={() => <Reset/>}/>
                <Route path='/cards/:packId' render={() => <Cards/>}/>
                <Route path='/card-game' render={() => <CardGame/>}/>
            </HashRouter>
        </div>
    );
}

export default App;
