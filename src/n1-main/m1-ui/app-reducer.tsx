import {authTC} from "../Login/Reducer/login-reducer";
import React from "react";
import {
    changePreloaderTrigger,
    changeTriggerPreloaderActionType
} from "../../n3-common_components/Preloader/Reducer/PreloaderReducer";

//Types
type InitializedType = ReturnType<typeof initializedSuccess>
type ActionTypes = InitializedType | changeTriggerPreloaderActionType
type InitialStateType = {
    initialized: boolean
}
//______________________________________________________________________________________________________________________

const initialState = {
    initialized: false,

}
//Reducer
export const appReducer = (state: InitialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case "INITIALIZED_SUCCESS" :
            return {
                ...state,
                initialized: action.initialized
            }
        default:
            return state;
    }
}

//Action Creators
export const initializedSuccess = (initialized: boolean) => ({type: 'INITIALIZED_SUCCESS', initialized} as const)
//______________________________________________________________________________________________________________________

//Thunks
export const initializeApp = () => async (dispatch: any) => {
    dispatch(changePreloaderTrigger(true))
    await dispatch(authTC())
    dispatch(initializedSuccess(true))
    dispatch(changePreloaderTrigger(false))


}
//______________________________________________________________________________________________________________________


export default appReducer;
