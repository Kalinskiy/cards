import {authTC} from "../Login/Reducer/login-reducer";
//Types
type InitializedType = ReturnType<typeof initializedSuccess>
type InitialStateType = {
    initialized: boolean
}
//______________________________________________________________________________________________________________________

const initialState = {
    initialized: false
}
//Reducer
export const appReducer = (state: InitialStateType = initialState, action: InitializedType) => {
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
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(authTC())
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess(true))
    })
}
//______________________________________________________________________________________________________________________


export default appReducer;
