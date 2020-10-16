import React from "react";
import style from './PlayButton.module.scss'
import play from '../../n2-assets/icons/play.png'
import {NavLink} from "react-router-dom";

type PlayButtonPropsType = {
    to: string
}

export const PlayButton = (props: PlayButtonPropsType) => {
    return (
        <div className={style.container}>
            <NavLink to={props.to} className={style.link}>
                <img src={play}/>
            </NavLink>
        </div>
    )
}