import axios from "axios";


export const instance = axios.create({
    // baseURL: 'https://cards-nya-back.herokuapp.com/1.0/',
     // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
})

//types-----------------------------------------------------------------------------------------------------------------
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
    name:string
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
    _id: string
    name?: string
}

//Object-----------------------------------------------------------------------------------------------------------------


export const packsAPI = {
    getPacks(userId?: string | null, pageCount = 8, page = 1, name?: string) {
        const promise = instance.get<GetPacksResponseType>(`/cards/pack?pageCount=${pageCount}&page=${page}&user_id=${userId ? userId : ''}&packName=${name ? name : ''}`).then(res => res.data)
        return promise

    },
    getPacksAll(pageCount = 8, page = 1, name?: string) {
        const promise = instance.get<GetPacksResponseType>(`/cards/pack?pageCount=${pageCount}&page=${page}&user_id=&packName=${name ? name : ''}`).then(res => res.data)
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
    renamePack(cardsPack: RenamePackDataType) {
        const promise = instance.put(`/cards/pack`, {cardsPack})
        return promise
    },
    savePhoto(photo: any) {
        const formData = new FormData()
        formData.append('image', photo)
        return instance.put(`/file`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

