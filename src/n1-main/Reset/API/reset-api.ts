import axios from "axios";
import {instance} from "../../Table/Table-API/API-Table";

//Login Parameters type

export type recoveringPasswordType ={
    password:string,
    resetPasswordToken:string,

}



export const resetAPI = {
    recovering(data:recoveringPasswordType) {
        return instance.post(`auth/set-new-password`, data)
    } ,



}


