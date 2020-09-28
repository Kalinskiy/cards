import React from "react";
import {useFormik} from "formik";
import {registrationTC} from "../../Registration-Page/Reducer/RegistrationReducer";
import {useDispatch} from "react-redux";
import {addPackTC} from "../Reducer/TableReducer";

export const AddPackForm = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        validate: (values) => {},
        initialValues: {
            cardName: '',
        },
        onSubmit: values => {
            dispatch(addPackTC)
        }
    })

    return (
        <form>
            <label htmlFor={"cardName"}>Card Name</label>
            <br/>
            <input
                type="text"
                {...formik.getFieldProps("cardName")}
            />
            <button type="submit">Submit</button>
        </form>
    )
}