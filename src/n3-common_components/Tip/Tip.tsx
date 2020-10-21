import React from "react";
import style from "./Tip.module.scss";

type TipPropsType = {
    tipText: string
}

export const Tip = (props: TipPropsType) => {
    return (
        <div className={style.tipContainer}>
            {props.tipText}
        </div>
    )
}