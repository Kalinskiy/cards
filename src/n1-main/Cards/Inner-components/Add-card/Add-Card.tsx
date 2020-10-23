import React from "react";
import style from "./Add-Card.module.scss"
import {useFormik} from "formik";
import {addCardTC} from "../../Cards-reducer/Cards-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../m2-bll/store";

export const AddCard = (props: any) => {

    const dispatch = useDispatch()

    const packId = useSelector<AppStateType, string | null>(state => state.cards.packId)

    const formik = useFormik({
        validate: (values) => {

        },
        initialValues: {
            cardsPack_id: packId,
            question: '',
            answer: ''
        },
        onSubmit: (values) => {
            const card = {
                cardsPack_id: packId,
                question: values.question,
                answer: values.answer
            }
            props.hideModalAddCard(true)

            dispatch(addCardTC(card, packId))
        }

    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={style.container}>
                <label htmlFor={"question"}>Type you'r question</label>
                <br/>
                <textarea
                    {...formik.getFieldProps("question")}
                />
                <br/>
                <label htmlFor={"answer"}>Type the answer</label>
                <br/>
                <textarea
                    {...formik.getFieldProps("answer")}
                />
                <br/>
                <button type="submit">Submit</button>
                <button type="reset" onClick={props.hideModalAddCard}>Cancel</button>

            </div>
        </form>
    )
}