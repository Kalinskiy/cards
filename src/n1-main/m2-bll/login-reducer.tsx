import React from "react";
import {loginAPI} from "../m3-dal/login-api";
import {setPreloader} from "../Registration-Page/Reducer/RegistrationReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";


//ActionTypes
type LoginReducerActionsType = any


//Types
type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, LoginReducerActionsType>

export type loginParamsType = {
    email: string,
    password: string
    rememberMe: boolean,

}
//______________________________________________________________________________________________________________________


//initialState
const initialState = {
    isLogged: false,
    isAuth: false,
    token: null
}

//______________________________________________________________________________________________________________________


//Reducer
const loginReducer = (state: any = initialState, action: any) => {


    switch (action.type) {
        case "login/IS_LOGIN": {
            return {...state, isLogged: true}
        }
        case "login/IS_AUTH": {
            return {...state, token: action.token}
        }
        default:
            return state;
    }
}
//______________________________________________________________________________________________________________________

//Thunks
export const loginTC = (data: loginParamsType): ThunkActionType => async (dispatch) => {
    try {
        dispatch(setPreloader(true))
        await loginAPI.login(data)
        dispatch(setLogin(true))
        console.log(data)

    } catch (error) {
        alert('login/password is incorrect ')
        console.log(error)
    } finally {
        dispatch(setPreloader(false))
    }
}

export const logoutTC = (data: loginParamsType): ThunkActionType => async (dispatch) => {
    try {
        dispatch(setPreloader(true))
        await loginAPI.logout()
        dispatch(setLogin(false))

    } catch (error) {
        console.log(error)
        dispatch(setPreloader(true))
    } finally {
        dispatch(setPreloader(false))
    }
}
export const authTC = (data: any): ThunkActionType => async (dispatch) => {
    try {
        await loginAPI.auth(data)
        if (setLogin(true)) {
            dispatch(setToken('121424124124'))
            console.log()
        }


    } catch (error) {
        alert('login/password is incorrect ')
    } finally {
        dispatch(setPreloader(false))
    }
}

//______________________________________________________________________________________________________________________

//actions

const setLogin = (isLogged: boolean) => ({type: "login/IS_LOGIN", isLogged} as const)
const setToken = (token: string) => ({type: "login/IS_AUTH", token} as const)
export default loginReducer;
