import React from "react";
import style from './Hint.module.scss'
import arrowImage from '../../n2-assets/icons/arrow.png'

type PropsType = {
    message: string
}

export const Hint = (props: PropsType) => {



    return <>
        <div className={style.container}>
                <div className={style.arrow}>
                    <img src={arrowImage} alt=""/>
                </div>

            <span>{props.message}</span>
        </div>
    </>
}




