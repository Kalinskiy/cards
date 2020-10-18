import React from "react";
import style from "./AllButton.module.scss";




type AllButtonPropsType = {
   onClick: () => void
    icon:any
}

export const AllButton = (props: AllButtonPropsType) => {
    return (
        <div className={style.container}
             onClick={props.onClick}
        >
            <img src={props.icon}/>
        </div>
    )
}
