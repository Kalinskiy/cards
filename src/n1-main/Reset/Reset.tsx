import React from 'react';
import s from './reset.module.css'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../m2-bll/store";
import {Preloader} from "../../n3-common_components/Preloader/Preloader";
import { useParams } from 'react-router-dom';
import {recoverPasswordTC} from "./Reducer/reset-reducer";

const Reset = () => {




    //Hooks
    const error = useSelector<AppStateType, string | null>(state => state.login.error)
    const preloader = useSelector<AppStateType, boolean>(state => state.register.preloader)
    const resetPasswordToken = useSelector<any>(state => state.login.resetPasswordToken)
    let url = useParams()

    const dispatch = useDispatch()
    const formik = useFormik({
        validate: (values) => {
            if (!values.password.trim())
                return {
                    password: 'password is required'
                }
        },
        initialValues: {
            password: '',
            resetPasswordToken:''

        },

        onSubmit: values => {
               dispatch(recoverPasswordTC({ password: values.password,resetPasswordToken:''})) // как достать токен из url?

        }
    })


    //______________________________________________________________________________________________________________________


    return (
        <div className={s.container}>

            {preloader ? <Preloader/> : null}
            <h1>Reset password</h1>
            <form onSubmit={formik.handleSubmit}>
                {error !== null ? <div style={{color: 'red'}}>{error}</div> : null}
                <div className={s.input}>
                    <div>New password</div>
                    <input
                        type="text"
                        placeholder={'password'}
                        {...formik.getFieldProps('password')}
                    />
                </div>
                <div>
                    <button

                        type='submit'
                    >Send
                    </button>
                </div>

            </form>
        </div>
    );
}

export default Reset;
