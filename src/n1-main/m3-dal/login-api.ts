import axios from "axios";
import {loginParamsType} from "../m2-bll/login-reducer";


const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0/',

});


export const loginAPI = {
    login(data:loginParamsType) {
        return instance.post(`auth/login`,data)
    },
    logout() {
        return instance.delete(`auth/login`).then(res=>res.data);
    },
    auth(token:string){
        return instance.post(`auth/me`,token)
    }


}


