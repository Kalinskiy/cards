

type InitialStateType = {
    trigger: boolean
}

export type changeTriggerPreloaderActionType = ReturnType<typeof changePreloaderTrigger>

type ActionType = changeTriggerPreloaderActionType



const initialState = {
    trigger: false
}


export const preloaderReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "preloader/CHANGE_TRIGGER":
            return {...state, trigger: action.value}
        default:
            return state;
    }
}


export const changePreloaderTrigger = (value: boolean) => ({type: "preloader/CHANGE_TRIGGER", value} as const)



