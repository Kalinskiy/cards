import axios from "axios";

//Login Parameters type
export type loginParamsType = {
    email: string,
    password: string
    rememberMe: boolean,
    token?: number | null
}


const instance = axios.create({
    // baseURL: 'https://cards-nya-back.herokuapp.com/1.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials:true
    //  baseURL: 'http://localhost:3000/'

});


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


