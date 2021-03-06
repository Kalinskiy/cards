import React from "react";
import style from "./Registration-Page.module.css"
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {registrationTC} from "./Reducer/RegistrationReducer";
import {Preloader} from "../../n3-common_components/Preloader/Preloader";
import {AppStateType} from "../m2-bll/store";
import {Redirect} from "react-router-dom";
import common from '../../n3-common_components/CommonStyles/common.module.css'


export const RegistrationPage = (props: any) => {

    const dispatch = useDispatch()

    const formik = useFormik({
        validate: (values) => {

            if (!values.email.trim())
                return {
                    email: 'Field is required'
                }
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                return {
                    email: 'Invalid email address'
                }
            }

            if (!values.password.trim())
                return {
                    password: 'Field is required'
                }
            if (!values.confirmPassword.trim())
                return {
                    confirmPassword: 'Field is required'
                }

        },
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: values => {
            if (values.password === values.confirmPassword) {
                dispatch(registrationTC(values))
            } else {
                alert(`Type you'r password again`)
            }
        }
    })
    const preloader = useSelector<AppStateType, boolean>(state => state.register.preloader)

    const disabled = (formik.errors.email || formik.errors.password || preloader) ? true : false


    const successRegistration = useSelector<AppStateType, boolean>(state => state.register.success)

    return (
        <div className={common.container}>
            <div className={common.wrapper}>
                {successRegistration ? <Redirect to={"/log-in"}/> : null}
                {preloader ? <Preloader/> : null}

                <form onSubmit={formik.handleSubmit}>
                    <div><h2>Registration</h2></div>
                    <div className={style.input}>
                        <label htmlFor={"email"}>Email</label>
                        <br/>
                        <input
                            type="text"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}

                    </div>
                    <div className={style.input}>
                        <label htmlFor={"password"}>Password</label>
                        <br/>
                        <input
                            type="password"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.errors.password ? <div style={{color: "red"}}>{formik.errors.password}</div> : null}
                    </div>
                    <div className={style.input}>
                        <label htmlFor={"confirmPassword"}>Password Confirm</label>
                        <br/>
                        <input
                            type="password"
                            {...formik.getFieldProps("confirmPassword")}
                        />
                        {formik.errors.confirmPassword ?
                            <div style={{color: "red"}}>{formik.errors.confirmPassword}</div> : null}
                    </div>
                    <div className={style.submit}>
                        <button type="submit"
                                disabled={disabled}
                        >Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}