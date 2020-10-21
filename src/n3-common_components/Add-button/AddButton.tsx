import React from "react";
import style from './AddButton.module.scss'
import addButton from '../../n2-assets/icons/add.svg'
import {Hint} from "../Hint/Hint";
import {useSelector} from "react-redux";
import {AppStateType} from "../../n1-main/m2-bll/store";


type AddButtonPropsType = {
    onClick: () => void
    message: string
    length: number
    searchName?:string
}


export const AddButton = (props: AddButtonPropsType) => {

    const isMyPacks = useSelector<AppStateType, boolean>(state => state.table.isMyPacks)
    const isMyCards = useSelector<AppStateType, boolean>(state => state.cards.isMycards)
    const conditionArrow = isMyPacks && !props.length && !props.searchName
    const conditionArrow2 = isMyCards && !props.length



    return (
        <div className={style.container}
             onClick={props.onClick}
        >
            {
                conditionArrow2 || conditionArrow
                    ?
                    <div className={style.hint}>{ !props.searchName && <Hint message={props.message}/>}</div>
                    : null}
            <img src={addButton}/>


        </div>

    )
}