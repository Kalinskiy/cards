import axios from "axios";


const instance = axios.create({
   // baseURL: 'https://neko-back.herokuapp.com/2.0',
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
})

//types...
export type PackType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

export type GetPacksResponseType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type AddPackDataType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}

export type RenamePackDataType = {
    id: string
    name?: string
}

export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
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
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
}

export type AddCardDataType = {
    card: CardDataType
}

export type UpdateCardDataType = {
    id: string
    question?: string
    comments?: string
}


export const packsAPI = {
    getPacks(userId?: string | null) {
        const promise = instance.get<GetPacksResponseType>(`/cards/pack?pageCount=7&user_id=${userId}`).then(res =>res.data)
        return promise
    },
    addPack(cardsPack: AddPackDataType) {
        const promise = instance.post(`/cards/pack`, {cardsPack})
        return promise
    },
    deletePack(packId: string | null) {
        const promise = instance.delete(`/cards/pack?id=${packId}`)
        return promise
    },
    renamePack(renamePackData: RenamePackDataType) {
        const promise = instance.put(`/cards/pack`, renamePackData)
        return promise
    }
}

export const cardsAPI = {
    getCards() {
        const promise = instance.get<GetCardsResponseType>(`/cards/pack?pageCount=7`)
        return promise
    },
    addCard(AddCardData: AddCardDataType) {
        const promise = instance.post(`/cards/card`, AddCardData)
        return promise
    },
    deleteCard() {
        const promise = instance.delete(`/cards/card`)
        return promise
    },
    updateCard(UpdateCardData: UpdateCardDataType) {
        const promise = instance.put(`/cards/card`, UpdateCardData)
        return promise
    }
}