import axios from "axios";

//Login Parameters type

export type recoveringPasswordType ={
    password:string,
    resetPasswordToken:string,

}


const instance = axios.create({
      baseURL:  'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials:true


});


export const resetAPI = {
    recovering(data:recoveringPasswordType) {
        return instance.post(`auth/set-new-password`, data)
    } ,



}


