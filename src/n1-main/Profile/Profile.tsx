import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../m2-bll/store";
import {authTC} from "../Login/Reducer/login-reducer";
import style from './profile.module.scss'
import {loginAPI} from "../Login/API/login-api";
import defaultImage from '../../n2-assets/images/user.png'
import {SettingsAnimation} from "../../n3-common_components/SettingsAnimation/SettingsAnimation";
import {ModalWithChildren} from "../../n3-common_components/Modal/Modal";
import {setProfile} from "./Reducer/profile-reducer";


const Profile = () => {


    const isLogged = useSelector<AppStateType, boolean>(state => state.login.isLogged)
    const avatar = useSelector<AppStateType, any>(state => state.login.auth.avatar)
    const userName = useSelector<AppStateType, string | null>(state => state.login.auth.name)


    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(authTC())
    }, [avatar])

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
    const [isShowSettings, setIsShowSettings] = useState(false)
    const [nameValue, setNameValue] = useState<any>(userName)


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

    const send = async () => {
        //const response = instance.post('/file', fileData);
        const response = await loginAPI.setProfile({avatar: file64, name: nameValue})
        setShowInputDetails(false)
        setIsShowSettings(false)


        dispatch(setProfile('', response.data.name))
        setIsShowSettings(false)

        dispatch(authTC())
    };
    const showSettingsModal = () => {
        setIsShowSettings(true)
    }
    const onChangeNameValue = (e: ChangeEvent<HTMLInputElement>) => {
        setNameValue(e.currentTarget.value)
    }

    return (

        <div className={style.container}>
            {!isLogged && <Redirect to='/log-in'/>}
            <div>
                <h2>{`Welcome to Cards Game, ${nameValue || 'User'}!`}</h2>
                <img className={style.image} src={avatar || defaultImage} alt={'file'} width={'300px'}/>


                <input
                    ref={inRef}
                    type={'file'}
                    style={{display: 'none'}}
                    onChange={upload}
                />
                <ModalWithChildren modalActive={isShowSettings}
                                   setModalActive={setIsShowSettings}
                                   onCancel={() => setIsShowSettings(false)}>
                    <div className={style.modalProfileContainer}>
                        <h3>Edit Profile:</h3>
                        <div className={style.choosePicture}>
                            <span>Choose your picture from files:</span>
                            <button onClick={() => inRef && inRef.current && inRef.current.click()}>Select</button>
                        </div>


                        {showDetailsInput &&
                        <div>
                            {/*<div>name: {file && file.name}</div>*/}
                            {/*<div>lastModified: {file && file.lastModified}</div>*/}
                            <div>size: {file && returnFileSize(file.size)}</div>
                            {/*<div>type: {file && file.type}</div>*/}
                        </div>
                        }
                        <div className={style.changeName}><span>Change  name:</span><input
                            type="text"
                            value={nameValue}
                            onChange={onChangeNameValue}
                        />
                            <button onClick={send}>Save</button>
                        </div>


                    </div>
                </ModalWithChildren>

                <SettingsAnimation showSettingsModal={showSettingsModal}/>
            </div>


        </div>
    );
}

export default Profile;