import React from "react";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {addPackTC} from "../../Table-Reducer/TableReducer";
import {AppStateType} from "../../../m2-bll/store";
import s from './Add-pack.module.css'



export const AddPackForm = () => {

    const dispatch = useDispatch()
    const userId = useSelector<AppStateType, string | null>(state => state.login.auth._id)

    const formik = useFormik({
        validate: (values) => {
        },
        initialValues: {
            name: '',
        },
        onSubmit: (values, {resetForm}:any) => {
            dispatch(addPackTC(userId, values))
            resetForm({values:''})
        }

    })


    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={s.cardName}>
                <label htmlFor={"name"}>Card Name</label>
                <input
                    type="text"
                    {...formik.getFieldProps("name")}
                />
                <button type="submit"   >Submit</button>
            </div>

            <br/>


        </form>
    )
}