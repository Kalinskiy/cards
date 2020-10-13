import React, {useState} from "react";
import style from "./Card.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {deleteCardTC} from "../../Cards-reducer/Cards-reducer";
import {AppStateType} from "../../../m2-bll/store";
import {Modal} from "../../../../n3-common_components/Modal/Modal";

export type CardType = {
    question: string | null
    answer: string | null
    id: string | null
    grade: number | null
}

export const Card = (props: CardType) => {
    const [deleteCardState, setDeleteCardState] = useState(false)

    const showModalDeleteCard = () => {
        setDeleteCardState(true)
    }


    const dispatch = useDispatch()
    const packId = useSelector<AppStateType, string | null>(state => state.cards.packId)

    const deleteHandler = () => {
        dispatch(deleteCardTC(props.id, packId))
    }

    return (
        <div className={style.container}>
            <Modal modalActive={deleteCardState}
                   setModalActive={setDeleteCardState}
                   onClick={deleteHandler}
                   onCancel={() => setDeleteCardState(false)}>
                <p>Do you want to remove this card?</p>
            </Modal>

            <button onClick={showModalDeleteCard}>Del</button>
            <div className={style.card}>{props.question}</div>
            <br/>
            <div>{props.answer}</div>
            <div>Grade is: {props.grade}</div>
        </div>
    )
}