import React, {useState} from 'react';
import s from './login.module.css'
import {useFormik} from "formik";

const LogIn = () => {

    // const [login, setLogin] = useState('');
    // const [password, setPassword] = useState('');
    // const [rememberMe, setRememberMe] = useState(false);

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
            rememberMe: false
        },
        onSubmit: values => {
            alert(JSON.stringify(values))
        }
    })

    return (
        <div className={s.container}>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.input}>
                    <div>email</div>
                    <input
                        type="text"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email ? <div>{formik.errors.email}</div> : null}

                </div>
                <div className={s.input}>
                    <div>password</div>
                    <input
                        type="password"
                        {...formik.getFieldProps('password')}
                        checked={formik.values.rememberMe}
                    />
                    {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                </div>
                <div>
                    <input type="checkbox"
                           {...formik.getFieldProps('rememberMe')}
                    />
                    <span>remember me</span>
                </div>
                <div>
                    <button>login</button>
                </div>
            </form>
        </div>
    );
}

export default LogIn;
