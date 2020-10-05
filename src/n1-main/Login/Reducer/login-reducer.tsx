import React from "react";
import {loginAPI, loginParamsType} from "../API/login-api";
import {setPreloader} from "../../Registration-Page/Reducer/RegistrationReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../m2-bll/store";
import {setProfile} from "../../Profile/Reducer/profile-reducer";


//ActionTypes
type SetLoginType = ReturnType<typeof setLogin>
type SetProfileType = ReturnType<typeof setProfile>
type SetErrorType = ReturnType<typeof setError>
type SetPreloaderActionType = ReturnType<typeof setPreloader>
type setLoginDataType = ReturnType<typeof setLoginData>
type setAuthDataType = ReturnType<typeof setAuthData>


type LoginReducerActionsType =
    SetLoginType
    | SetProfileType
    | SetErrorType
    | SetPreloaderActionType
    | setLoginDataType
    | setAuthDataType


//Thunk Types
type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, LoginReducerActionsType>

//______________________________________________________________________________________________________________________


//initialState
const initialState = {
    login: {
        _id: null,
        email: null,
        name: null,
        avatar: null,
        publicCardPacksCount: null,
        created: null,
        updated: null,
        isAdmin: null,
        verified: null,
        rememberMe: null,
        error: null
    },
    auth: {
        _id: null,
        email: null,
        name: null,
        avatar: null,
        publicCardPacksCount: null,
        created: null,
        updated: null,
        isAdmin: null,
        verified: null,
        rememberMe: null,
        error: null
    },
    initializedApp: false,
    isLogged: false,
    verified: false,
    error: null,
    email: null,
    name: null,
    password: null,
    resetPasswordToken: null
}

export type LoginAuthStateType = {
    _id: string | null
    email: string | null
    name: string | null
    avatar?: string | null
    publicCardPacksCount: number | null
    created: Date | null
    updated: Date | null
    isAdmin: boolean | null
    verified: boolean | null
    rememberMe: boolean | null
    error: string | null
}

type InitialStateType = {
    login: LoginAuthStateType
    auth: LoginAuthStateType
    initializedApp: boolean
    isLogged: boolean
    verified: boolean
    error: null | string
    email: null | string
    name: null | string
    password: null | string
    resetPasswordToken: null | string
}


//______________________________________________________________________________________________________________________


//Table-Reducer
const loginReducer = (state: InitialStateType = initialState, action: LoginReducerActionsType) => {
    switch (action.type) {
        case "login/IS_LOGGED":
            return {...state, isLogged: action.isLogged}
        case "login/SET_ERROR":
            return {...state, error: action.error}
        case "login/SET_AUTH_DATA":
            return {...state, auth: action.data}
        case "login/SET_LOGIN_DATA":
            return {...state, login: action.data}
        default:
            return state;
    }
}
//______________________________________________________________________________________________________________________

//Thunks
export const loginTC = (data: loginParamsType): ThunkActionType => async (dispatch) => {
    try {
        dispatch(setPreloader(true))
        let res = await loginAPI.login(data)
        if (res.status === 200) {
            dispatch(setLoginData(res.data))
            dispatch(setLogin(true))
            dispatch(setProfile(res.data.name, res.data.email))
        }
    } catch (error) {
        dispatch(setError(error.response.data.error + ' more details in console'))
    } finally {
        dispatch(setPreloader(false))
    }
}
export const logoutTC = (): ThunkActionType => async (dispatch) => {
    try {
        const res = await loginAPI.deleteAuth()
        dispatch(setLogin(false))
        dispatch(setProfile(null, null))

    } catch (error) {
        console.log(error.response.data.error)
    }
}
export const authTC = (): ThunkActionType => async (dispatch) => {
    try {
        dispatch(setPreloader(true))
        const res = await loginAPI.auth()
        if (res.data.email && res.data.name) {
            dispatch(setAuthData(res.data))
            dispatch(setLogin(true))
        }
    } catch (e) {
        console.log(e.response.data.error)
    } finally {
        dispatch(setPreloader(false))
    }

}


//______________________________________________________________________________________________________________________

//Action Creators
export const setLogin = (isLogged: boolean) => ({type: "login/IS_LOGGED", isLogged} as const)
export const setError = (error: string | null) => ({type: "login/SET_ERROR", error} as const)
export const setLoginData = (data: LoginAuthStateType) => ({type: "login/SET_LOGIN_DATA", data} as const)
export const setAuthData = (data: LoginAuthStateType) => ({type: "login/SET_AUTH_DATA", data} as const)


export default loginReducer;
