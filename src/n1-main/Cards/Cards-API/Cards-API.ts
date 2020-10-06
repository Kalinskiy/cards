import {instance} from "../../Table/Table-API/API-Table";

//types-----------------------------------------------------------------------------------------------------------------

export type CardsType = {
    answer: string |null
    question: string |null
    cardsPack_id: string |null
    grade: number
    rating: number |null
    shots: number |null
    type: string |null
    user_id: string |null
    created: string |null
    updated: string |null
    __v: number |null
    _id: string |null
}

export type GetCardsResponseType = {
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
}

export type CardDataType = {
    cardsPack_id: string | null
    question?: string | null
    answer?: string | null
    grade?: number | null
    shots?: number | null
    rating?: number | null
    answerImg?: string | null
    questionImg?: string | null
    questionVideo?: string | null
    answerVideo?: string | null
    type?: string | null
}

export type AddCardDataType = {
    card: CardDataType
}

export type UpdateCardDataType = {
    _id: string
    question?: string
    comments?: string
}

//Object-----------------------------------------------------------------------------------------------------------------

export const cardsAPI = {
    getCards(packId: string | null, pageCount: number) {
        const promise = instance.get<GetCardsResponseType>(`/cards/card?cardsPack_id=${packId}&pageCount=${pageCount}`).then(res =>res.data.cards)
        return promise
    },
    addCard(card: CardDataType) {
        const promise = instance.post(`/cards/card`, {card})
        return promise
    },
    deleteCard(cardId: string | null) {
        const promise = instance.delete(`/cards/card?id=${cardId}`)
        return promise
    },
    updateCard(UpdateCardData: UpdateCardDataType) {
        const promise = instance.put(`/cards/card`, {UpdateCardData})
        return promise
    },
    updateCardGrade(grade: number, card_id: string) {
        const promise = instance.put(`/cards/grade`, {grade: grade, card_id: card_id})
        return promise
    }
}