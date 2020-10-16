import React from "react";
import style from './AddButton.module.scss'
import addButton from '../../n2-assets/icons/add.svg'

type AddButtonPropsType = {
    onClick: () => void
}

export const AddButton = (props: AddButtonPropsType) => {
    return (
        <div className={style.container}
             onClick={props.onClick}
        >
            <img src={addButton}/>
        </div>
    )
}