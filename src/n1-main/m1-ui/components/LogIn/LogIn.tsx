import React from 'react';
import s from './login.module.css'

const LogIn = () => {
    return (
        <div className={s.container}>
            <div className={s.input}>
                <div>login</div>
                <input type="text"/>
            </div>
            <div className={s.input}>
                <div>password</div>
                <input type="password"/>
            </div>
            <div>
                <button>Log-in</button>
            </div>
        </div>
    );
}

export default LogIn;
