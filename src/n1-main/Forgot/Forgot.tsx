import React from 'react';
import s from './forgot.module.css'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {forgotTC} from "./Reducer/forgot-reducer"
import {AppStateType} from "../m2-bll/store";
import {Preloader} from "../../n3-common_components/Preloader/Preloader";

const Forgot = () => {


    //Hooks
    const error = useSelector<AppStateType, string | null>(state => state.login.error)
    const preloader = useSelector<AppStateType, boolean>(state => state.register.preloader)
    const dispatch = useDispatch()
    const formik = useFormik({
        validate: (values) => {
            if (!values.email.trim())
                return {
                    email: 'email is required'
                }
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                return {
                    email: 'Invalid email address'
                }
            }

        },
        initialValues: {
            email: '',
        },
        onSubmit: values => {
           dispatch(forgotTC({ email: values.email, from: 'Sasha', message: `<div> <a href="http://localhost:3000/#/reset/">Recover your password</a> </div>`} ))

        }
    })


    //______________________________________________________________________________________________________________________



    return (
        <div className={s.container}>

            {preloader ? <Preloader/> : null}
            <h1>Forgot password</h1>
            <form onSubmit={formik.handleSubmit}>
                {error !== null ? <div style={{color: 'red'}}>{error}</div> : null}
                <div className={s.input}>
                    <div>Email</div>
                    <input
                        type="text"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email ? <div className={s.error}>{formik.errors.email}</div> : null}

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

export default Forgot;
