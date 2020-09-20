import {DataType, registrationAPI} from "../API/API-Registration-Page";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../m2-bll/store";

//types...

type SetPreloaderActionType = ReturnType<typeof setPreloader>

type SetSuccessActionType = ReturnType<typeof setSuccess>

type RegistrationReducerActionsType = SetPreloaderActionType
    | SetSuccessActionType

type InitStateType = typeof initialState

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, RegistrationReducerActionsType>


const initialState = {
    preloader: false,
    success: false
}

//______________________________________________________________________________________________________________________


const registrationReducer = (state: InitStateType = initialState, action: RegistrationReducerActionsType) => {

    switch (action.type) {
        case "registration/PRELOADER_IS_FETCHING": {
            return {...state, preloader: action.isFetching}
        }
        case "registration/IS_SUCCESS": {
            return {...state, success: action.isSuccess}
        }
        default:
            return state;
    }
}

//Action Creators

export const setPreloader = (isFetching: boolean) => ({type: "registration/PRELOADER_IS_FETCHING", isFetching} as const)
export const setSuccess = (isSuccess: boolean) => ({type: "registration/IS_SUCCESS", isSuccess} as const)

//______________________________________________________________________________________________________________________

//Thunks

export const registrationTC = (data: DataType): ThunkActionType => async (dispatch) => {
    try {
        dispatch(setPreloader(true))
        const response = await registrationAPI.registration(data)
        dispatch(setPreloader(false))
        alert('Registration is succeed')
        dispatch(setSuccess(true))
    }
    catch (error) {
        console.log(error)
        dispatch(setPreloader(false))
    }

}

//______________________________________________________________________________________________________________________


export default registrationReducer;
