import React, {useState} from "react";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {addPackTC} from "../../Table-Reducer/TableReducer";
import {AppStateType} from "../../../m2-bll/store";
import s from './Add-pack.module.css'
import Modal from "../../../../n3-common_components/Modal/Modal";
import { Dispatch } from "redux";

type PropsType = {
    modalActive: boolean
    setModalActive: (modalActive: boolean) => void
}

export const AddPackForm = (props: PropsType) => {

    const [values, setValues] = useState({})
    const [resetForm, setResetForm] = useState({})


    const dispatch = useDispatch()
    const userId = useSelector<AppStateType, string | null>(state => state.login.auth._id)

    const setModule = {}
    const onSubmitFunc = () => {
        dispatch(addPackTC(userId, values))
        props.setModalActive(false)


    }

    const formik = useFormik({
        validate: (values) => {
        },
        initialValues: {
            name: '',
        },
        onSubmit: (values, {resetForm}: any) => {
            // dispatch(addPackTC(userId, values))
            // resetForm({values: ''})
            setValues(values)
            setResetForm(resetForm)
            props.setModalActive(true)

        }

    })


    return (
        <>
            <Modal modalActive={props.modalActive} setModalActive={props.setModalActive} onClick={onSubmitFunc}
                   onCancel={() => props.setModalActive(false)}>
                <p>Do you want to add new pack?</p>
            </Modal>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.cardName}>
                    <label htmlFor={"name"}>Card Name</label>
                    <input
                        type="text"
                        {...formik.getFieldProps("name")}
                    />
                    <button type="submit">Submit</button>
                </div>

                <br/>


            </form>
        </>
    )
}