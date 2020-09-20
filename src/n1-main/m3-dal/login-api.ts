import axios from "axios";


const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0/',

});


export const loginAPI = {
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post(`auth/login`, {email, password, rememberMe});
    },

}


