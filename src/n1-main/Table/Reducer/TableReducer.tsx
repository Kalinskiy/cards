import {PackType, packsAPI, CardsType, AddPackDataType} from "../API/API-Table";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../m2-bll/store";



type SavePackType = ReturnType<typeof savePack>

type ActionType = SavePackType

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

type InitialStateType = {
    packs: PackType[]
    cards: CardsType[]
    cardsTotalCount: number | null
    maxGrade: number | null
    minGrade: number | null
    page: number | null
    pageCount: number | null
}
//______________________________________________________________________________________________________________________


const initialState = {
    packs: [] as PackType[],
    cards: [] as CardsType[],
    cardsTotalCount: null,
    maxGrade: null,
    minGrade: null,
    page: null,
    pageCount: null,
}

const tableReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "table/SAVE_PACK" :
           return {
               ...state,
               packs: action.packs
           }
        default:
            return state;
    }
}

//Action Creators

export const savePack = (packs: PackType[]) => ({type: "table/SAVE_PACK", packs} as const)

//______________________________________________________________________________________________________________________

//Thunks

export const getPacksTC = (userId: string | null): ThunkActionType => async (dispatch) => {
    try {
        const data = await packsAPI.getPacks(userId)
        dispatch(savePack(data.cardPacks))
    }
    catch (error) {
        console.log(error)
    }

}

export const addPackTC = (userId: string | null, addPackData?: AddPackDataType): ThunkActionType => async (dispatch) => {
    try {
        const cardsPack = addPackData ? addPackData : {}
        const response = await packsAPI.addPack(cardsPack)
        debugger
       dispatch(getPacksTC(userId))
    }
    catch (error) {
        console.log(error)
    }

}

export const deletePackTC = (packId: string | null, userId: string | null) : ThunkActionType => async (dispatch) => {
    try {
        const response = packsAPI.deletePack(packId)
        dispatch(getPacksTC(userId))
    }
    catch (error) {

    }
}

//______________________________________________________________________________________________________________________


export default tableReducer;
