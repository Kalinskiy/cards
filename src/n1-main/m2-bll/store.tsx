import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from 'redux-thunk';
import loginReducer from "./login-reducer";
import registrationReducer from "../Registration-Page/Reducer/RegistrationReducer";
import newPasswordReducer from "./new-password-reducer";
import profileReducer from "./profile-reducer";
import forgotPasswordReducer from "./password-renewal";

const reducers = combineReducers({

    login: loginReducer,
    register: registrationReducer,
    newPass:newPasswordReducer,
    profile:profileReducer,
    forgot: forgotPasswordReducer



})


export type AppStateType = ReturnType<typeof reducers>


let store = createStore(reducers,applyMiddleware(thunkMiddleWare));





export default store;
