import {PackType, packsAPI, AddPackDataType} from "../Table-API/API-Table";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../m2-bll/store";
import {
    changeTrigger,
    changeTriggerRenameType
} from "../../../n3-common_components/Rename-window/Reducer/Rename-Reducer";
import {
    changePreloaderTrigger,
    changeTriggerPreloaderActionType
} from "../../../n3-common_components/Preloader/Reducer/PreloaderReducer";
import {CardsType} from "../../Cards/Cards-API/Cards-API";


type SavePackType = ReturnType<typeof savePack>
type GetPageType = ReturnType<typeof getPage>
type TotalPackType = ReturnType<typeof setTotalCadrds>

type ActionType = SavePackType
    | TotalPackType | GetPageType
    | changeTriggerRenameType
    | changeTriggerPreloaderActionType

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

type InitialStateType = {
    packs: PackType[]
    cards: CardsType[]
    cardsTotalCount: number | null
    maxGrade: number | null
    minGrade: number | null
    page: number
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
    page: 0,
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
export const getPage = (page: number) => ({type: "table/GET_PAGE", page} as const)
export const setTotalCadrds = (packsCount: number) => ({type: "table/SET_TOTAL_CARDS", packsCount} as const)

//______________________________________________________________________________________________________________________

//Thunks

export const getPacksTC = (userId: string | null, pageCount = 7, page = 0, name?: string): ThunkActionType => async (dispatch) => {
    dispatch(changePreloaderTrigger(true))
    try {
        const data = await packsAPI.getPacks(userId, pageCount, page, name)
        dispatch(savePack(data.cardPacks))
        dispatch(setTotalCadrds(data.cardPacksTotalCount))
        dispatch(getPage(data.page))
        console.log(data)
    } catch (error) {
        console.log(error)
    }
    dispatch(changePreloaderTrigger(false))
}



export const addPackTC = (userId: string | null, addPackData?: AddPackDataType): ThunkActionType => async (dispatch) => {
    dispatch(changePreloaderTrigger(true))
    try {
        const cardsPack = addPackData ? addPackData : {}
        const response = await packsAPI.addPack(cardsPack)
        dispatch(getPacksTC(userId))

    } catch (error) {
        console.log(error)
    }
    dispatch(changePreloaderTrigger(false))
}

export const deletePackTC = (packId: string | null, userId: string | null): ThunkActionType => async (dispatch) => {
    dispatch(changePreloaderTrigger(true))
    try {
        const response = await packsAPI.deletePack(packId)
        dispatch(getPacksTC(userId))
    } catch (error) {

        dispatch(changePreloaderTrigger(false))

    }
}

export const changePackNameTC = (data: any, userId: string | null): ThunkActionType => async (dispatch) => {
    dispatch(changePreloaderTrigger(true))
    try {
        const response = await packsAPI.renamePack(data)
        dispatch(changeTrigger(false))
        dispatch(getPacksTC(userId))
    } catch (error) {

    }
    dispatch(changePreloaderTrigger(false))

}


//______________________________________________________________________________________________________________________


export default tableReducer;
