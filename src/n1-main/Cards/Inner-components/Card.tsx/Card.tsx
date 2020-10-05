import React from "react";
import style from "./Card.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {deleteCardTC} from "../../Cards-reducer/Cards-reducer";
import {AppStateType} from "../../../m2-bll/store";

export type CardType = {
    question: string | null
    answer: string | null
    id: string | null
}

export const Card = (props: CardType) => {

    const dispatch = useDispatch()
    const packId = useSelector<AppStateType, string | null>(state => state.cards.packId)

    const deleteHandler = () => {
        dispatch(deleteCardTC(props.id, packId))
    }

    return (
        <div className={style.container}>
            <button onClick={deleteHandler}>Del</button>
            <div className={style.card}>{props.question}</div>
            <br/>
            <div>{props.answer}</div>
        </div>
    )
}