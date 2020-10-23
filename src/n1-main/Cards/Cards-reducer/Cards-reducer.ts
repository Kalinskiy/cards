import {CardDataType, cardsAPI, CardsType} from "../Cards-API/Cards-API";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../m2-bll/store";
import {
    changePreloaderTrigger,
    changeTriggerPreloaderActionType
} from "../../../n3-common_components/Preloader/Reducer/PreloaderReducer";
import {setIsMyPacks, setTotalPacks} from "../../Table/Table-Reducer/TableReducer";

//types-----------------------------------------------------------------------------------------------------------------

export type SaveCardsActionType = ReturnType<typeof saveCards>
export type SavePackIdActionType = ReturnType<typeof savePackId>
export type AddCardActionType = ReturnType<typeof addCard>
export type ChangeCurrentCardActionType = ReturnType<typeof changeCurrentCard>
export type GetPageType = ReturnType<typeof getCardPage>
export type TotalCardsType = ReturnType<typeof setTotalCards>
export type SetIsMyCardsType = ReturnType<typeof setIsMyCards>
export type SetIsMyCardsLoaded = ReturnType<typeof setIsCardsLoaded>

type ActionsType = SaveCardsActionType
    | SavePackIdActionType
    | AddCardActionType
    | ChangeCurrentCardActionType
    | changeTriggerPreloaderActionType
    | GetPageType
    | TotalCardsType
    | SetIsMyCardsType
    | SetIsMyCardsLoaded


type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

type InitialStateType = {
    cards: CardsType[]
    packId: string | null
    addCard: boolean,
    currentCard: number
    page: number
    cardsTotalCount: number | null
    isMyCards: boolean
    isCardsLoaded: boolean
}

//state-----------------------------------------------------------------------------------------------------------------

const initialState = {
    cards: [],
    currentCard: 0,
    packId: null,
    addCard: false,
    page: 1,
    cardsTotalCount: 0,
    isMyCards: true,
    isCardsLoaded: false

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
                isMyCards: action.isMyCards
            }
        case "cards/SET_IS_CARDS_LOADED":
            return {
                ...state, isCardsLoaded: action.isCardsLoaded
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
export const setIsMyCards = (isMyCards: boolean) => ({type: 'cards/SET_IS_MY_CARDS', isMyCards} as const)
export const setIsCardsLoaded = (isCardsLoaded: boolean) => ({
    type: 'cards/SET_IS_CARDS_LOADED',
    isCardsLoaded
} as const)

//thunks-----------------------------------------------------------------------------------------------------------------

export const getCardsTC = (packId: string | null, isMyCards: boolean, pageCount: number = 100, page = 1,): ThunkActionType => async (dispatch) => {
    dispatch(changePreloaderTrigger(true))

    try {
        const data = await cardsAPI.getCards(packId, isMyCards, pageCount, page)
        dispatch(setIsCardsLoaded(true))
        dispatch(savePackId(packId))
        dispatch(saveCards(data))

    } catch (error) {
        console.log('catch')
    }
    dispatch(changePreloaderTrigger(false))

}

export const addCardTC = (card: CardDataType, packId?: any, pageCount: any = 100, page = 1): ThunkActionType => async (dispatch) => {
    dispatch(changePreloaderTrigger(true))
    try {
        const data = await cardsAPI.addCard(card)
        dispatch(addCard(false))
        debugger
        dispatch(getCardsTC(card.cardsPack_id, true))
    } catch (error) {
        console.log(error)
    }
    dispatch(changePreloaderTrigger(false))

}

export const deleteCardTC = (cardId: string | null, packId?: any, pageCount: any = 100): ThunkActionType => async (dispatch) => {
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




