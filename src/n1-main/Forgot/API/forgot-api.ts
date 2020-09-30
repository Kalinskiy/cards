import axios from "axios";


//Login Parameters type
export type loginParamsType = {
    email: string,
    password: string
    rememberMe: boolean,
    token?: number | null
}
export type forgotParamsType = {
    email: string,
    from: string,
    message: string
}
const instance = axios.create({
    // baseURL: 'https://cards-nya-back.herokuapp.com/1.0/',
    //baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
    //  baseURL: 'http://localhost:3000/'

});


export const forgotAPI = {
    forgot(data: forgotParamsType) {
        return instance.post(`auth/forgot`, data)
    },


}


