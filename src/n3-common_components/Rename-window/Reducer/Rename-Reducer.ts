import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../../n1-main/m2-bll/store";

type InitialStateType = {
    trigger: boolean
    packId: string | null
}

type savePackIdType = ReturnType<typeof savePackId>
export type changeTriggerRenameType = ReturnType<typeof changeTrigger>
type ActionType = savePackIdType | changeTriggerRenameType

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

const initialState = {
    trigger: false,
    packId: null
}


export const renamePackReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "rename-pack/CHANGE_TRIGGER":
            return {...state, trigger: action.value}
        case "rename-pack/SAVE_PACK_ID":
            return {...state, packId: action.packId}
        default:
            return state;
    }
}

export const savePackId = (packId: string | null) => ({type: "rename-pack/SAVE_PACK_ID", packId} as const)
export const changeTrigger = (value: boolean) => ({type: "rename-pack/CHANGE_TRIGGER", value} as const)



