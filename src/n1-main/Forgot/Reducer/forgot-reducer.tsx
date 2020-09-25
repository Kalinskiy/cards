import React from "react";
import {forgotParamsType} from "../API/forgot-api"
import {setPreloader} from "../../Registration-Page/Reducer/RegistrationReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../m2-bll/store";
import {forgotAPI} from "../API/forgot-api";


//ActionTypes
type SetPreloaderActionType = ReturnType<typeof setPreloader>
type ForgotReducerActionType = SetPreloaderActionType

//Thunk Types
type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ForgotReducerActionType>

//______________________________________________________________________________________________________________________


//initialState
const initialState = {}
type InitialStateType  = {}
//______________________________________________________________________________________________________________________


//Reducer
export const forgotPasswordReducer = (state: InitialStateType = initialState, action: ForgotReducerActionType) => {

    switch (action.type) {
        default:
            return state;
    }
}
//______________________________________________________________________________________________________________________

//Thunks
export const forgotTC = (data : forgotParamsType): ThunkActionType => async (dispatch) => {
    try {
        dispatch(setPreloader(true))
       const res = await forgotAPI.forgot(data)
        console.log(res)
       if(res.status === 200){
         // dispatch(resetPasswordToken())
        }

    } catch (e) {
        console.log(e.response.data.error)
    } finally {
        dispatch(setPreloader(false))
    }
}

//______________________________________________________________________________________________________________________

//Action Creators


export default forgotPasswordReducer;
