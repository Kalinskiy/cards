import React from "react";
import style from "./BackButton.module.scss";
import {NavLink} from "react-router-dom";
import backButton from "../../n2-assets/icons/backButton.png";
import {Tip} from "../Tip/Tip";

type BackButtonPropsType = {
    to: string
}

export const BackButton = (props: BackButtonPropsType) => {
    return (
        <div className={style.backButton}>
            <NavLink to={props.to} className={style.image}>
                <img src={backButton}/>
            </NavLink>
            <div>
                <div className={style.tip}>
                    <Tip tipText={'Get back'}/>
                </div>
            </div>
        </div>
    )
}
