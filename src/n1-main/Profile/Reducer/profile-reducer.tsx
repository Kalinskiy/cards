import React from "react";
import {setPreloader} from "../../Registration-Page/Reducer/RegistrationReducer";


//ActionTypes
type SetProfileType = ReturnType<typeof setProfile>
type SetPreloaderActionType = ReturnType<typeof setPreloader>


type ProfileReducerActionsType = | SetProfileType | SetPreloaderActionType


//Thunk Types
//type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ProfileReducerActionsType>

//______________________________________________________________________________________________________________________


//initialState
const initialState = {
    email: null,
    name: null,
}
type InitialStateType = {
    email: null | string,
    name: null | string,
}


//______________________________________________________________________________________________________________________


//Reducer
const profileReducer = (state: InitialStateType = initialState, action: ProfileReducerActionsType) => {
    switch (action.type) {
        case "profile/SET_PROFILE": {
            return {
                ...state, email: action.email, name: action.name
            }
        }
        default:
            return state;
    }
}
//______________________________________________________________________________________________________________________

//Thunks
//______________________________________________________________________________________________________________________

//Action Creators
export const setProfile = (email: string | null, name: string | null) => ({
    type: "profile/SET_PROFILE",
    email,
    name
} as const)


export default profileReducer;
