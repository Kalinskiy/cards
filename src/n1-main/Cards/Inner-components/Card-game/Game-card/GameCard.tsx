import React, {useState} from "react";
import style from "./Game-card.module.scss"
import {ModalWithChildren} from "../../../../../n3-common_components/Modal/Modal";
import question from '../../../../../n2-assets/icons/question.png'



export type CardType = {
    question: string | null
    answer: string | null
    id: string | null
    grade: number | null
}

export const GameCard = (props: CardType) => {

    const [answer, setAnswer] = useState(false)


    return (
        <div className={style.container}>
            <div className={style.question}>{props.question}</div>
            <div className={style.showAnswer} onClick={() => {setAnswer(true)}}>
                <img src={question}/>
            </div>
            <ModalWithChildren modalActive={answer}
                               setModalActive={setAnswer}
                               onCancel={() => setAnswer(false)}
            >
                <p className={style.answer}> {props.answer}</p>
                <button onClick={() => setAnswer(false)}>X</button>
            </ModalWithChildren>
        </div>
    )
}