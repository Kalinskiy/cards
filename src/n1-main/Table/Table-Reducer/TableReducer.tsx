import {packsAPI, PackType} from "../Table-API/API-Table";
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
import {setIsMyCards, SetIsMyCardsType} from "../../Cards/Cards-reducer/Cards-reducer";


type SavePackType = ReturnType<typeof savePack>
type GetPageType = ReturnType<typeof getPackPage>
type TotalPackType = ReturnType<typeof setTotalPacks>
type SetPhotoType = ReturnType<typeof setPhotoSuccess>
type SetIsMyPacksType = ReturnType<typeof setIsMyPacks>
type setErrorSearchType = ReturnType<typeof setErrorSearch>
type setIsSearchType = ReturnType<typeof setIsSearch>

type ActionType = SavePackType
    | TotalPackType | GetPageType
    | changeTriggerRenameType
    | changeTriggerPreloaderActionType
    | SetPhotoType
    | SetIsMyPacksType
    | SetIsMyCardsType
    | setErrorSearchType
    | setIsSearchType

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
    isMyPacks: boolean
    search: string | null
    isSearch: boolean
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
    packsCount: null,
    isMyPacks: true,
    search: null,
    isSearch: false
}

const tableReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "table/SAVE_PACK" :
            return {
                ...state,
                packs: action.packs
            }
        case "table/SET_TOTAL_PACKS" :
            return {
                ...state,
                packsCount: action.packsCount
            }
        case "table/GET_PAGE" :
            return {
                ...state,
                page: action.page
            }
        case "table/SET_IS_MY_PACKS" :
            return {
                ...state,
                value: action.value
            }
        case "table/SET_ERROR_SEARCH" :
            return {
                ...state,
                search: action.search
            }
        case "table/SET_ISE_SEARCH": {
            return {
                ...state, isSearch: action.value
            }
        }
        default:
            return state;
    }
}

//Action Creators

export const savePack = (packs: PackType[]) => ({type: "table/SAVE_PACK", packs} as const)
export const getPackPage = (page: number) => ({type: "table/GET_PAGE", page} as const)
export const setTotalPacks = (packsCount: number) => ({type: "table/SET_TOTAL_PACKS", packsCount} as const)
export const setPhotoSuccess = (photos: any) => ({type: 'table/SAVE_PHOTO_SUCCESS', photos} as const);
export const setIsMyPacks = (value: boolean) => ({type: 'table/SET_IS_MY_PACKS', value} as const)
export const setErrorSearch = (search: string | null) => ({type: 'table/SET_ERROR_SEARCH', search} as const)
export const setIsSearch = (value: boolean) => ({type: 'table/SET_ISE_SEARCH', value} as const)

//______________________________________________________________________________________________________________________

//Thunks

export const getPacksTC = (userId: string | null, pageCount = 9, page = 0, isMyPacks?: boolean, name?: string,): ThunkActionType => async (dispatch) => {
    dispatch(changePreloaderTrigger(true))
    try {
        const data = await packsAPI.getPacks(userId, pageCount, page, name)
        dispatch(savePack(data.cardPacks))
        dispatch(setTotalPacks(data.cardPacksTotalCount))
        dispatch(getPackPage(data.page))
        dispatch(setIsMyCards(true))

        if (isMyPacks)
            dispatch(setIsMyPacks(false))
        else {
            dispatch(setIsMyPacks(true))
        }


    } catch (error) {
        console.log(error)
    }
    dispatch(changePreloaderTrigger(false))
}
export const getPacksAllTC = (pageCount = 9, page = 0, name?: string): ThunkActionType => async (dispatch) => {
    dispatch(changePreloaderTrigger(true))
    try {
        const data = await packsAPI.getPacksAll(pageCount, page, name)
        dispatch(savePack(data.cardPacks))
        dispatch(setTotalPacks(data.cardPacksTotalCount))
        dispatch(getPackPage(data.page))
        dispatch(setIsMyPacks(false))
        dispatch(setIsMyCards(false))

    } catch (error) {
        console.log(error)
    }
    dispatch(changePreloaderTrigger(false))
}


export const addPackTC = (userId: string | null, addPackData?: string): ThunkActionType => async (dispatch) => {
    dispatch(changePreloaderTrigger(true))
    try {
        const cardsPack = addPackData ? {name: addPackData} : {}
        const response = await packsAPI.addPack(cardsPack)

        if (response.status === 201) {
            dispatch(getPacksTC(userId))
        }

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
        debugger
        const response = await packsAPI.renamePack(data)
        console.log()
        dispatch(changeTrigger(false))
        dispatch(getPacksTC(userId))
    } catch (error) {

    }
    dispatch(changePreloaderTrigger(false))

}


//______________________________________________________________________________________________________________________


export default tableReducer;
