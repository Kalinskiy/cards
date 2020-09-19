import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from 'redux-thunk';
import loginReducer from "./login-reducer";
import registerReducer from "./register-reducer";
import newPasswordReducer from "./new-password-reducer";
import profileReducer from "./profile-reducer";
import forgotPasswordReducer from "./password-renewal";

const reducers = combineReducers({

    login: loginReducer,
    register: registerReducer,
    newPass:newPasswordReducer,
    profile:profileReducer,
    forgot: forgotPasswordReducer



})


export type AppStoreType = ReturnType<typeof reducers>


let store = createStore(reducers,applyMiddleware(thunkMiddleWare));





export default store;
