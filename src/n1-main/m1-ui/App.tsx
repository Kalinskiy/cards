import React from 'react';
import './App.css';
import Header from "../Header/Header";
import {HashRouter, Route} from "react-router-dom";
import LogIn from "../Login/LogIn";
import Profile from "../Profile/Profile";
import {RegistrationPage} from "../Registration-Page/Registration-Page";
import Forgot from "../Forgot/Forgot";
import Reset from "../Reset/Reset";
import {Table} from "../Table/Table";


const App = () => {
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
            </HashRouter>
        </div>
    );
}

export default App;
