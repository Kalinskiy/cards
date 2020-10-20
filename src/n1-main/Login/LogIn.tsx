import React from 'react';
import s from './login.module.css'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {LoginAuthStateType, loginTC} from "./Reducer/login-reducer";
import {AppStateType} from "../m2-bll/store";
import {NavLink, Redirect} from "react-router-dom";
import {Preloader} from "../../n3-common_components/Preloader/Preloader";
import common from '../../n3-common_components/CommonStyles/common.module.css'

const LogIn = () => {


    //Hooks
    const error = useSelector<AppStateType, string | null>(state => state.login.error)
    const preloader = useSelector<AppStateType, boolean>(state => state.register.preloader)

    const isLogged = useSelector<AppStateType, boolean>(state => state.login.isLogged)
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
    const disabled = !!(formik.errors.email || formik.errors.password || preloader)


    return (
        <div className={common.container}>
            <div className={common.wrapper}>
                <div className={s.login}>
                    {isLogged ? <Redirect to={"/table"}/> : null}
                    {preloader ? <Preloader/> : null}


                    <form onSubmit={formik.handleSubmit}>

                        {error !== null ? <div style={{color: 'red'}}>{error}</div> : null}
                        <div className={s.input}>
                            <div><h2>Login</h2></div>
                            <div>email</div>
                            <input
                                type="text"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.errors.email ? <div className={common.error}>{formik.errors.email}</div> : null}

                        </div>
                        <div className={s.input}>
                            <div>password</div>
                            <input
                                type="password"
                                {...formik.getFieldProps('password')}
                                checked={formik.values.rememberMe}
                            />
                            {formik.errors.password ?
                                <div className={common.error}>{formik.errors.password}</div> : null}
                        </div>
                        <div>
                            <input type="checkbox"
                                   {...formik.getFieldProps('rememberMe')}
                            />
                            <span>remember me</span>
                        </div>

                        <div>
                            <button
                                disabled={disabled}
                                type='submit'
                            >login
                            </button>
                        </div>
                        <div><NavLink className={s.link} to={'/forgot'}>forgot password?</NavLink></div>
                        <div><NavLink className={s.link} to={'/register'}>Don`t have an account?</NavLink></div>


                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
