import {instance} from "../../Table/Table-API/API-Table";
import {UpdateCardDataType} from "../../Cards/Cards-API/Cards-API";


//Login Parameters type
export type loginParamsType = {
    email: string,
    password: string
    rememberMe: boolean,
    token?: number | null
}

export type ProfileDataType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error: string;

}

type SetProfileDataType = {
    name: string
    avatar: string
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
    setProfile(data: SetProfileDataType) {
        return instance.put(`auth/me`, data)
    }





}


