import React, {Dispatch} from "react";
import {loginAPI, loginParamsType} from "../m3-dal/login-api";
import {useSelector} from "react-redux";
import {AppStoreType} from "./store";
import {Redirect} from "react-router-dom";

const initialState = {
    isLogged:false
}

//reducer
const loginReducer = (state: any = initialState, action: any) => {


    switch (action.type) {
        default:
            return state;
    }
}

//thunk
export const loginTC = (data:loginParamsType) =>(dispatch:Dispatch<ActionType>)=>{




    loginAPI.login(data)
        .then((res)=>{
            if(res){

            }
        })
        .catch((error)=>{
            console.log('you`ve got an error')

        })

}
//actionTypes
type ActionType = any

//actions


export default loginReducer;
