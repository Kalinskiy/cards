import React from 'react';
import s from './login.module.css'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../../m2-bll/login-reducer";
import {AppStateType} from "../../../m2-bll/store";
import {NavLink, Redirect} from "react-router-dom";
import {Preloader} from "../../../../n3-common_components/Preloader/Preloader";

const LogIn = () => {

    //Hooks
    const preloader = useSelector<AppStateType, boolean>(state => state.register.preloader)
    const isLogged = useSelector<AppStateType, boolean>(state => state.login.isLogged)
    const dispatch = useDispatch()
    const formik = useFormik({
        validate: (values) => {
            if (!values.email.trim())
                return {
                    email: 'email is required'
                }

            if (!values.password.trim())
                return {
                    password: 'password is required'
                }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,

        },
        onSubmit: values => {
            dispatch(loginTC(values)

            )
        }
    })
    //______________________________________________________________________________________________________________________




    return (
        <div className={s.container}>
            {isLogged ? <Redirect to={"/profile"}/> : null}
            {preloader ? <Preloader/> : null}
            <form onSubmit={formik.handleSubmit}>
                <div className={s.input}>
                    <div>email</div>
                    <input
                        type="text"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email ? <div className={s.error}>{formik.errors.email}</div> : null}

                </div>
                <div className={s.input}>
                    <div>password</div>
                    <input
                        type="password"
                        {...formik.getFieldProps('password')}
                        checked={formik.values.rememberMe}
                    />
                    {formik.errors.password ? <div className={s.error}>{formik.errors.password}</div> : null}
                </div>
                <div>
                    <input type="checkbox"
                           {...formik.getFieldProps('rememberMe')}
                    />
                    <span>remember me</span>
                </div>
                <div>
                    <button
                        type='submit'
                    >login
                    </button>
                </div>
                <div>
                    <NavLink to={'/forgot'}>forgot password?</NavLink>
                </div>
            </form>
        </div>
    );
}

export default LogIn;
