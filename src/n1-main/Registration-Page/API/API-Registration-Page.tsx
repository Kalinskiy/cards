import axios from "axios";


const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0/'
})

export type DataType = {
    email: string
    password: string
}

type AddedUserType = {
        email: string
        isAdmin: boolean
        _id: string
}

type ResponseType = {
    addedUser: AddedUserType
    success: boolean
}


export const registrationAPI = {
    registration(data:DataType) {
        const promise = instance.post<ResponseType>(`auth/register`, data).then(res =>res.data);
        return promise
    }
}