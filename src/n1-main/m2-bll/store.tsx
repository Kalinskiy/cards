import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunkMiddleWare from 'redux-thunk';
import loginReducer from "../Login/Reducer/login-reducer";
import registrationReducer from "../Registration-Page/Reducer/RegistrationReducer";
import newPasswordReducer from "../Reset/Reducer/reset-reducer";
import profileReducer from "../Profile/Reducer/profile-reducer";
import forgotPasswordReducer from "../Forgot/Reducer/forgot-reducer";
import tableReducer from "../Table/Table-Reducer/TableReducer";
import {renamePackReducer} from "../../n3-common_components/Rename-window/Reducer/Rename-Reducer";
import {preloaderReducer} from "../../n3-common_components/Preloader/Reducer/PreloaderReducer";
import {cardsReducer} from "../Cards/Cards-reducer/Cards-reducer";


const reducers = combineReducers({
    login: loginReducer,
    register: registrationReducer,
    newPass:newPasswordReducer,
    profile:profileReducer,
    forgot: forgotPasswordReducer,
    table: tableReducer,
    rename: renamePackReducer,
    preloader: preloaderReducer,
    cards: cardsReducer
})


export type AppStateType = ReturnType<typeof reducers>

// @ts-ignore

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// @ts-ignore
let store = createStore(reducers, composeEnhancers (applyMiddleware(thunkMiddleWare)));


// @ts-ignore
window.store =  store



export default store;
