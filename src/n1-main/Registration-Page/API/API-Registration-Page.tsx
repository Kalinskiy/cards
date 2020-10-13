import {instance} from "../../Table/Table-API/API-Table";


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