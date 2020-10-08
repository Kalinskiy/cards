import React from "react";
import img from '../../n2-assets/images/error-access.png'
import s from './ErrorPage.module.css'
import {NavLink} from "react-router-dom";
import common from '../../n3-common_components/CommonStyles/common.module.css'

type ErorMessgeType = {
    errorText: string
}
const ErrorPage = (props:ErorMessgeType)=>{
    return <div className={s.container}>
        <h2>{props.errorText}</h2>
        <img src={img} alt=""/>
        <NavLink className={common.link} to={'/log-in'}>log-in</NavLink>
        <NavLink className={common.link} to={'/forgot'}>forgot password?</NavLink>
        </div>

}
export default ErrorPage