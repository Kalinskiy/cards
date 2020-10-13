import {instance} from "../../Table/Table-API/API-Table";


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


export const forgotAPI = {
    forgot(data: forgotParamsType) {
        return instance.post(`auth/forgot`, data)
    },


}


