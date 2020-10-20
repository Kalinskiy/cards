import {CardDataType, cardsAPI, CardsType} from "../Cards-API/Cards-API";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../m2-bll/store";
import {
    changePreloaderTrigger,
    changeTriggerPreloaderActionType
} from "../../../n3-common_components/Preloader/Reducer/PreloaderReducer";
import {setIsMyPacks, setTotalPacks} from "../../Table/Table-Reducer/TableReducer";

//types-----------------------------------------------------------------------------------------------------------------

type SaveCardsActionType = ReturnType<typeof saveCards>
type SavePackIdActionType = ReturnType<typeof savePackId>
type AddCardActionType = ReturnType<typeof addCard>
type ChangeCurrentCardActionType = ReturnType<typeof changeCurrentCard>
type GetPageType = ReturnType<typeof getCardPage>
type TotalCardsType = ReturnType<typeof setTotalCards>
type SetIsMyCardsType = ReturnType<typeof setIsMyCards>

type ActionsType = SaveCardsActionType
    | SavePackIdActionType
    | AddCardActionType
    | ChangeCurrentCardActionType
    | changeTriggerPreloaderActionType
    | GetPageType
    | TotalCardsType
    | SetIsMyCardsType


type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

type InitialStateType = {
    cards: CardsType[]
    packId: string | null
    addCard: boolean,
    currentCard: number
    page: number
    cardsTotalCount: number | null
    isMycards: boolean
}

//state-----------------------------------------------------------------------------------------------------------------

const initialState = {
    cards: [],
    currentCard: 0,
    packId: null,
    addCard: false,
    page: 1,
    cardsTotalCount: 0,
    isMycards: false

}

//reducer-----------------------------------------------------------------------------------------------------------------

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "cards/SAVE_CARDS":
            return {...state, cards: action.cards}
        case "cards/SAVE_PACK_ID":
            return {...state, packId: action.packId}
        case "cards/SET_ADD_CARD":
            return {...state, addCard: action.value}
        case "cards/SET_CURRENT_CARD":
            return {...state, currentCard: action.value}
        case "cards/GET_PAGE" :
            return {
                ...state,
                page: action.page
            }
        case "cards/SET_TOTAL_CARDS" :
            return {
                ...state,
                packsCount: action.cardsTotalCount
            }
        case "cards/SET_IS_MY_CARDS" :
            return {
                ...state,
                value: action.value
            }
        default:
            return state;
    }
}

//actions-----------------------------------------------------------------------------------------------------------------

export const saveCards = (cards: any) => ({type: "cards/SAVE_CARDS", cards} as const)
export const savePackId = (packId: string | null) => ({type: "cards/SAVE_PACK_ID", packId} as const)
export const addCard = (value: boolean) => ({type: "cards/SET_ADD_CARD", value} as const)
export const changeCurrentCard = (value: number) => ({type: "cards/SET_CURRENT_CARD", value} as const)

export const getCardPage = (page: number) => ({type: "cards/GET_PAGE", page} as const)
export const setTotalCards = (cardsTotalCount: number) => ({type: "cards/SET_TOTAL_CARDS", cardsTotalCount} as const)
export const setIsMyCards = (value: boolean) => ({type: 'cards/SET_IS_MY_CARDS', value} as const)

//thunks-----------------------------------------------------------------------------------------------------------------

export const getCardsTC = (packId: string | null,isMycards:boolean =false, pageCount: number = 10, page = 1,): ThunkActionType => async (dispatch) => {
    dispatch(changePreloaderTrigger(true))
    try {
        const data = await cardsAPI.getCards(packId,isMycards, pageCount, page)
        dispatch(savePackId(packId))
        dispatch(saveCards(data))
        if (isMycards)
            dispatch(setIsMyCards(false))
        else {
            dispatch(setIsMyCards(true))
        }

        //  dispatch(getCardPage(data.cardsTotalCount))
        console.log(data)
    } catch (error) {
        console.log('catch')
    }
    dispatch(changePreloaderTrigger(false))

}

export const addCardTC = (card: CardDataType, packId?: any, pageCount?: any, page = 1): ThunkActionType => async (dispatch) => {
    dispatch(changePreloaderTrigger(true))
    try {
        const data = await cardsAPI.addCard(card)
        dispatch(addCard(false))
        dispatch(getCardsTC(card.cardsPack_id, pageCount, page))
    } catch (error) {
        console.log(error)
    }
    dispatch(changePreloaderTrigger(false))

}

export const deleteCardTC = (cardId: string | null, packId?: any, pageCount?: any): ThunkActionType => async (dispatch) => {
    dispatch(changePreloaderTrigger(true))
    try {
        const data = await cardsAPI.deleteCard(cardId)
        dispatch(getCardsTC(packId, pageCount))
    } catch (error) {

    }
}

export const updateCardGrade = (grade: number, card_id: string | null, packId: string | null): ThunkActionType => async (dispatch) => {
    try {

        const data = await cardsAPI.updateCardGrade(grade, card_id)
        // getCardsTC(packId)
    } catch (error) {

    }
    dispatch(changePreloaderTrigger(false))

}




