import React from "react";
import {setPreloader} from "../../Registration-Page/Reducer/RegistrationReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../m2-bll/store";
import {recoveringPasswordType, resetAPI} from "../API/reset-api";


//ActionTypes

type SetPreloaderActionType = ReturnType<typeof setPreloader>
type ResetPasswordTokenType = ReturnType<typeof resetPasswordToken>

type ResetReducerActionsType =  SetPreloaderActionType | ResetPasswordTokenType

//Thunk Types
type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ResetReducerActionsType>

//______________________________________________________________________________________________________________________


//initialState
const initialState = {
    isLogged: false,
    verified: false,
    error: null,
    email: null,
    name: null,
    password:null,
    resetPasswordToken: null
}
 type InitialStateType  = {
    isLogged: boolean,
    verified: boolean,
    error: null | string,
    email: null | string,
    name: null | string,
    password:null | string,
    resetPasswordToken: null | string
}


//______________________________________________________________________________________________________________________


//Table-Reducer
const newPasswordReducer = (state: InitialStateType = initialState, action: ResetReducerActionsType) => {


    switch (action.type) {
        case "RESET_PASSWORD_TOKEN": {
            return {...state, resetPasswordToken: action.resetPasswordToken}
        }

        default:
            return state;
    }
}
//______________________________________________________________________________________________________________________

//Thunks



export const recoverPasswordTC = (data:recoveringPasswordType): ThunkActionType => async (dispatch) => {
    try {
        dispatch(setPreloader(true))
       const res = await resetAPI.recovering(data)


    } catch (e) {
        console.log(e.response.data.error)
    } finally {
        dispatch(setPreloader(false))
    }
}

//______________________________________________________________________________________________________________________

//Action Creators
export const resetPasswordToken = (resetPasswordToken: string | null) => ({type: "RESET_PASSWORD_TOKEN", resetPasswordToken} as const)

export default newPasswordReducer;
