import {instance} from "../../Table/Table-API/API-Table";


//Login Parameters type
export type loginParamsType = {
    email: string,
    password: string
    rememberMe: boolean,
    token?: number | null
}





export const loginAPI = {
    login(data: loginParamsType) {
        return instance.post(`auth/login`, data)
    },
    auth() {
        return instance.post(`auth/me`, {})
    },
    deleteAuth() {
        return instance.delete(`auth/me`,{})
    },




}


