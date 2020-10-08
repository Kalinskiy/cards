import {CardDataType, cardsAPI, CardsType} from "../Cards-API/Cards-API";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../m2-bll/store";
import {
    changePreloaderTrigger,
    changeTriggerPreloaderActionType
} from "../../../n3-common_components/Preloader/Reducer/PreloaderReducer";

//types-----------------------------------------------------------------------------------------------------------------

type SaveCardsActionType = ReturnType<typeof saveCards>
type SavePackIdActionType = ReturnType<typeof savePackId>
type AddCardActionType = ReturnType<typeof addCard>
type ChangeCurrentCardActionType = ReturnType<typeof changeCurrentCard>

type ActionsType = SaveCardsActionType
    | SavePackIdActionType
    | AddCardActionType
    | ChangeCurrentCardActionType
    | changeTriggerPreloaderActionType


type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

type InitialStateType = {
    cards: CardsType[]
    packId: string | null
    addCard: boolean,
    currentCard: number
}

//state-----------------------------------------------------------------------------------------------------------------

const initialState = {
    cards: [
        {
            answer: null,
            question: null,
            cardsPack_id: null,
            grade: 0,
            rating: null,
            shots: null,
            type: null,
            user_id: null,
            created: null,
            updated: null,
            __v: null,
            _id: null,
        }
    ],
    currentCard: 0,
    packId: null,
    addCard: false
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
        default:
            return state;
    }
}

//actions-----------------------------------------------------------------------------------------------------------------

export const saveCards = (cards: any) => ({type: "cards/SAVE_CARDS", cards} as const)
export const savePackId = (packId: string | null) => ({type: "cards/SAVE_PACK_ID", packId} as const)
export const addCard = (value: boolean) => ({type: "cards/SET_ADD_CARD", value} as const)
export const changeCurrentCard = (value: number) => ({type: "cards/SET_CURRENT_CARD", value} as const)

//thunks-----------------------------------------------------------------------------------------------------------------

export const getCardsTC = (packId: string | null, pageCount: any = 10): ThunkActionType => async (dispatch) => {

    dispatch(changePreloaderTrigger(true))
    try {
        const data = await cardsAPI.getCards(packId, pageCount)
        dispatch(savePackId(packId))
        dispatch(saveCards(data))
        console.log(data)
    } catch (error) {

    }
    dispatch(changePreloaderTrigger(false))

}

export const addCardTC = (card: CardDataType, packId?: any, pageCount?: any): ThunkActionType => async (dispatch) => {
    dispatch(changePreloaderTrigger(true))
    try {
        const data = await cardsAPI.addCard(card)
        dispatch(addCard(false))
        dispatch(getCardsTC(card.cardsPack_id, pageCount))
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




