import axios from "axios";

//Login Parameters type

export type recoveringPasswordType ={
    password:string,
    resetPasswordToken:string,

}


const instance = axios.create({
    // baseURL: 'https://cards-nya-back.herokuapp.com/1.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials:true
    //  baseURL: 'http://localhost:3000/'

});


export const resetAPI = {
    recovering(data:recoveringPasswordType) {
        return instance.post(`auth/set-new-password`, data)
    } ,



}


