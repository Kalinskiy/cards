import React from "react";
import preloader from "../../n2-assets/images/preloader.svg"
import style from "./Preloader.module.scss"

export const Preloader = () => {

    return (
        <div className={style.container}>
            <img src={preloader}/>
        </div>
    )
}