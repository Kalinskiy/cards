import {CardDataType, cardsAPI, CardsType} from "../Cards-API/Cards-API";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../m2-bll/store";

//types-----------------------------------------------------------------------------------------------------------------

type SaveCardsActionType = ReturnType<typeof saveCards>
type SavePackIdActionType = ReturnType<typeof savePackId>
type AddCardActionType = ReturnType<typeof addCard>

type ActionsType = SaveCardsActionType | SavePackIdActionType | AddCardActionType

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

type InitialStateType = {
    cards: CardsType[]
    packId: string | null
    addCard: boolean
}

//state-----------------------------------------------------------------------------------------------------------------

const initialState = {
    cards: [
        {
            answer: null,
            question: null,
            cardsPack_id: null,
            grade: null,
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
    packId: null,
    addCard: false
}

//reducer-----------------------------------------------------------------------------------------------------------------

export const cardsReducer = (state:InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "cards/SAVE_CARDS":
            return {...state, cards: action.cards}
        case "cards/SAVE_PACK_ID":
            return {...state, packId: action.packId}
        case "cards/SET_ADD_CARD":
            return {...state, addCard: action.value}
        default:
            return state;
    }
}

//actions-----------------------------------------------------------------------------------------------------------------

export const saveCards = (cards: any) => ({type: "cards/SAVE_CARDS", cards} as const)
export const savePackId = (packId: string | null) => ({type: "cards/SAVE_PACK_ID", packId} as const)
export const addCard = (value: boolean) => ({type: "cards/SET_ADD_CARD", value} as const)

//thunks-----------------------------------------------------------------------------------------------------------------

export const getCardsTC = (packId: string | null, pageCount: any ): ThunkActionType => async (dispatch) => {
    try {
        const data = await cardsAPI.getCards(packId, pageCount)
        dispatch(savePackId(packId))
        dispatch(saveCards(data))
    } catch (error) {

    }
}

export const addCardTC = (card: CardDataType, packId?: any, pageCount?: any ): ThunkActionType => async (dispatch) => {
    try {
        const data = await cardsAPI.addCard(card)
        dispatch(addCard(false))
        dispatch(getCardsTC(card.cardsPack_id, pageCount))
    } catch (error) {
        console.log(error)
    }
}

export const deleteCardTC = (cardId: string | null, packId?: any, pageCount?: any): ThunkActionType => async (dispatch) => {
    try {
        const data = await cardsAPI.deleteCard(cardId)
        dispatch(getCardsTC(packId, pageCount))
    } catch (error) {

    }
}


