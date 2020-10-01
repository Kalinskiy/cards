import {PackType, packsAPI, CardsType, AddPackDataType} from "../API/API-Table";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../m2-bll/store";



type SavePackType = ReturnType<typeof savePack>
type GetPageType = ReturnType<typeof getPage>
type TotalPackType = ReturnType<typeof setTotalCadrds>

type ActionType = SavePackType | TotalPackType | GetPageType

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

type InitialStateType = {
    packs: PackType[]
    cards: CardsType[]
    cardsTotalCount: number | null
    maxGrade: number | null
    minGrade: number | null
    page: number | null
    pageCount: number | null
    packsCount: null | number
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
    packsCount: null
}

const tableReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "table/SAVE_PACK" :
           return {
               ...state,
               packs: action.packs
           }
        case "table/SET_TOTAL_CARDS" :
            return {
                ...state,
                packsCount: action.packsCount
            }
            case "table/GET_PAGE" :
            return {
                ...state,
                page: action.page
            }
        default:
            return state;
    }
}

//Action Creators

export const savePack = (packs: PackType[]) => ({type: "table/SAVE_PACK", packs} as const)
export const getPage = (page: number | null) => ({type: "table/GET_PAGE", page} as const)
export const setTotalCadrds = (packsCount: number) => ({type: "table/SET_TOTAL_CARDS", packsCount} as const)

//______________________________________________________________________________________________________________________

//Thunks

export const getPacksTC = (userId: string | null, pageCount=7, page=1): ThunkActionType => async (dispatch) => {
    try {
        const data = await packsAPI.getPacks(userId, pageCount, page)
        dispatch(savePack(data.cardPacks))
        dispatch( setTotalCadrds(data.cardPacksTotalCount) )
        dispatch(getPage(page))
    }
    catch (error) {
        console.log(error)
    }

}

export const addPackTC = (userId: string | null, addPackData?: AddPackDataType): ThunkActionType => async (dispatch) => {
    try {
        const cardsPack = addPackData ? addPackData : {}
        const response = await packsAPI.addPack(cardsPack)
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
