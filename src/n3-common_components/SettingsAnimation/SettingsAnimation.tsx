import React from "react";
import style from './SettingsAnimation.module.css'


type PropsType = {
    showSettingsModal:()=>void

}
export const SettingsAnimation = (props:PropsType) => {
    return <div className={style.img} onClick={props.showSettingsModal}>
        <img src="http://habrastorage.org/files/7cd/799/944/7cd79994458f4fc6a9345aa7444650a3.png"/>
    </div>
}