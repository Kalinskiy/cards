import React from "react";
import style from './AddButton.module.scss'
import addButton from '../../n2-assets/icons/add.svg'
import {Hint} from "../Hint/Hint";
import {useSelector} from "react-redux";
import {AppStateType} from "../../n1-main/m2-bll/store";
import {CardsType} from "../../n1-main/Cards/Cards-API/Cards-API";
import {Tip} from "../Tip/Tip";


type AddButtonPropsType = {
    onClick: () => void
    message: string
    length: number

}


export const AddButton = (props: AddButtonPropsType) => {

    const isMyPacks = useSelector<AppStateType, boolean>(state => state.table.isMyPacks)
    const isMyCards = useSelector<AppStateType, boolean>(state => state.cards.isMyCards)
    const conditionArrow = isMyPacks && !props.length
    const conditionArrow2 = isMyCards && !props.length


    return (
        <div className={style.container}
             onClick={props.onClick}
        >
            {
                conditionArrow2 || conditionArrow
                    ? <div className={style.hint}><Hint message={props.message}/></div>
                    : null
            }
            <img src={addButton}/>
        </div>

    )
}