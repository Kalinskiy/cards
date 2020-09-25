import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunkMiddleWare from 'redux-thunk';
import loginReducer from "../Login/Reducer/login-reducer";
import registrationReducer from "../Registration-Page/Reducer/RegistrationReducer";
import newPasswordReducer from "../Reset/Reducer/reset-reducer";
import profileReducer from "../Profile/Reducer/profile-reducer";
import forgotPasswordReducer from "../Forgot/Reducer/forgot-reducer";


const reducers = combineReducers({

    login: loginReducer,
    register: registrationReducer,
    newPass:newPasswordReducer,
    profile:profileReducer,
    forgot: forgotPasswordReducer



})


export type AppStateType = ReturnType<typeof reducers>

// @ts-ignore

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// @ts-ignore
let store = createStore(reducers, composeEnhancers (applyMiddleware(thunkMiddleWare)));


// @ts-ignore
window.store =  store



export default store;
