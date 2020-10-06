import axios from "axios";
import {instance} from "../../Table/Table-API/API-Table";

// const instance = axios.create({
//     baseURL: 'https://cards-nya-back.herokuapp.com/1.0/'
//    // baseURL: "http://localhost:7542/2.0/"
// })

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