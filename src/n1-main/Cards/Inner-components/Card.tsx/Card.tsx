import React, {useCallback, useState} from "react";
import style from "./Card.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {deleteCardTC} from "../../Cards-reducer/Cards-reducer";
import {AppStateType} from "../../../m2-bll/store";
import {Modal, ModalWithChildren} from "../../../../n3-common_components/Modal/Modal";
import star from '../../../../n2-assets/icons/star.png'
import {Tip} from "../../../../n3-common_components/Tip/Tip";

export type CardType = {
    question: string | null
    answer: string | null
    id: string | null
    grade: number | null
}

export const Card = React.memo((props: CardType) => {
    console.log('Card')

    const dispatch = useDispatch()
    const packId = useSelector<AppStateType, string | null>(state => state.cards.packId)

    const [deleteCardState, setDeleteCardState] = useState(false)
    const [answer, setAnswer] = useState(false)

    const showModalDeleteCard = () => {
        setDeleteCardState(true)
    }
    const deleteHandler = useCallback(() => {
        dispatch(deleteCardTC(props.id, packId))
    },[props.id])

    return (
        <div className={style.container}>

            <div className={style.displayContainer}>
                <div className={style.buttonsContainer}>

                    <div className={style.deleteElement}
                         onClick={showModalDeleteCard}>
                        <div className={style.tipDelete}>
                            <Tip tipText={'Delete'}/>
                        </div>
                    </div>

                    <div className={style.updateCardElement}>
                        <div className={style.tipUpdate}>
                            <Tip tipText={'Update'}/>
                        </div>
                    </div>

                    <div className={style.getAnswerElement}
                         onClick={() => setAnswer(true)}>
                        <div className={style.tipAnswer}>
                            <Tip tipText={'Answer'}/>
                        </div>
                    </div>

                </div>
            </div>

            <div className={style.question}>{props.question}</div>

            <div className={style.gradeContainer}>
                <div className={style.grade}>{props.grade && props.grade.toFixed(1)}</div>
                <div className={style.star}><img src={star}/></div>
            </div>


            <Modal modalActive={deleteCardState}
                   setModalActive={setDeleteCardState}
                   onClick={deleteHandler}
                   onCancel={() => setDeleteCardState(false)}>
                <p className={style.answer}>Do you want to remove this card?</p>
            </Modal>

            <ModalWithChildren modalActive={answer}
                               setModalActive={setAnswer}
                               onCancel={() => setAnswer(false)}
            >
                <p className={style.answer}> {props.answer}</p>
                <button onClick={() => setAnswer(false)}>X</button>
            </ModalWithChildren>

        </div>
    )
})