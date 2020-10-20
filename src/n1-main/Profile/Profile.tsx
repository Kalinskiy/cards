import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../m2-bll/store";
import {authTC} from "../Login/Reducer/login-reducer";
import style from './profile.module.scss'
import {instance} from "../Table/Table-API/API-Table";
import {loginAPI} from "../Login/API/login-api";
import defaultImage from '../../n2-assets/images/user.png'


const Profile = () => {

    const isLogged = useSelector<AppStateType, boolean>(state => state.login.isLogged)
    const avatar = useSelector<AppStateType, any>(state => state.login.auth.avatar)
    /*   const dispatch = useDispatch()
       const [value, setValue] = useState(false)



       const handleAuth = async () => {
           await dispatch (authTC())
           setValue(true)
       }

       if(value && !isLogged) {
           return <Redirect to={'log-in'}/>
       }*/

    const inRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState();
    const [file64, setFile64] = useState();
    const [showDetailsInput, setShowInputDetails] = useState(false)


    const upload = async (e: ChangeEvent<HTMLInputElement>) => {

        const reader = new FileReader();
        reader.onloadend = () => {
            setFile64(reader.result);
        };
        const newFile = e.target.files && e.target.files[0];
        if (newFile) {
            setFile(newFile);
            reader.readAsDataURL(newFile);
        }
        setShowInputDetails(true)


    };

    const returnFileSize = (n: number) => {
        if (n < 1024) {
            return n + 'bytes';
        } else if (n > 1024 && n < 1048576) {
            return (n / 1024).toFixed(2) + 'KB';
        } else if (n > 1048576) {
            return (n / 1048576).toFixed(2) + 'MB';
        }
    };

    const send = () => {
        //const response = instance.post('/file', fileData);
        const response = loginAPI.setProfile({avatar: file64, name: 'Sasha'})
        setShowInputDetails(false)

    };


    return (

        <div className={style.container}>
            {!isLogged && <Redirect to='/log-in'/>}
            <div>

                <img className={style.image} src={avatar || defaultImage} alt={'file'} width={'300px'}/>
                {showDetailsInput && <div>
                    <div>name: {file && file.name}</div>
                    <div>lastModified: {file && file.lastModified}</div>
                    <div>size: {file && returnFileSize(file.size)}</div>
                    <div>type: {file && file.type}</div>
                </div>
                }

                <input
                    ref={inRef}
                    type={'file'}
                    style={{display: 'none'}}
                    onChange={upload}
                />
                <button onClick={() => inRef && inRef.current && inRef.current.click()}>add</button>
                <button onClick={send}>send</button>

                {/*<div className={style.notification}>Фотография успешно загружена!</div>*/}
            </div>

        </div>
    );
}

export default Profile;