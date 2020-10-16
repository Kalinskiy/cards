import React from "react";
import style from "./Game-card.module.scss"



export type CardType = {
    question: string | null
    answer: string | null
    id: string | null
    grade: number | null
}

export const GameCard = (props: CardType) => {


    return (
        <div className={style.container}>
            <div className={style.card}>{props.question}</div>
            <br/>
            <div>{props.answer}</div>
            <div>Grade is: {props.grade}</div>
        </div>
    )
}