import React from 'react';
import './App.css';
import Header from "./header/Header";
import {HashRouter, Route} from "react-router-dom";
import LogIn from "./components/LogIn/LogIn";
import Profile from "./components/Profile/Profile";

const App = ()=> {


    return (
        <div className="App">
            {/*HashRouter, Provider*/}
            <HashRouter>
                <Header/>




                <Route exact path='/log-in' render={() => <LogIn/>}/>
                <Route exact path='/profile' render={() => <Profile/>}/>
            </HashRouter>



        </div>
    );
}

export default App;
