import React from "react";
import style from "./Game-card.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-bll/store";
import {deleteCardTC} from "../../../Cards-reducer/Cards-reducer";


export type CardType = {
    question: string | null
    answer: string | null
    id: string | null
    grade: number | null
}

export const GameCard = (props: CardType) => {

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
            <div>Grade is: {props.grade}</div>
        </div>
    )
}