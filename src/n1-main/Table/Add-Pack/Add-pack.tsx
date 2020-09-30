import React from "react";
import {useFormik} from "formik";
import {registrationTC} from "../../Registration-Page/Reducer/RegistrationReducer";
import {useDispatch, useSelector} from "react-redux";
import {addPackTC} from "../Reducer/TableReducer";
import {AppStateType} from "../../m2-bll/store";

export const AddPackForm = () => {

    const dispatch = useDispatch()
    const userId = useSelector<AppStateType, string | null>(state => state.login.auth._id)

    const formik = useFormik({
        validate: (values) => {},
        initialValues: {
            name: '',
        },
        onSubmit: values => {
            dispatch(addPackTC(userId, values))
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor={"name"}>Card Name</label>
            <br/>
            <input
                type="text"
                {...formik.getFieldProps("name")}
            />
            <button type="submit">Submit</button>
        </form>
    )
}