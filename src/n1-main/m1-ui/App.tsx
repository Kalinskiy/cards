import React from 'react';
import './App.css';
import Header from "./header/Header";
import {HashRouter, Route} from "react-router-dom";
import LogIn from "./components/LogIn/LogIn";
import Profile from "./components/Profile/Profile";
import {RegistrationPage} from "../Registration-Page/Registration-Page";


const App = ()=> {


    return (
        <div className="App">

            <HashRouter>
                <Header/>
                <Route exact path='/log-in' render={() => <LogIn/>}/>
                <Route exact path='/profile' render={() => <Profile/>}/>
                <Route exact path='/register' render={() => <RegistrationPage/>}/>
            </HashRouter>



        </div>
    );
}

export default App;
