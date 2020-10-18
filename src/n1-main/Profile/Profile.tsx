import React, {ChangeEvent, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../m2-bll/store";
import {authTC} from "../Login/Reducer/login-reducer";
import style from './profile.module.scss'
import {instance} from "../Table/Table-API/API-Table";
import {loginAPI} from "../Login/API/login-api";


const Profile = () => {

/*    const isLogged =  useSelector<AppStateType,boolean>(state=>state.login.isLogged)
    const dispatch = useDispatch()
    const [value, setValue] = useState(false)



    const handleAuth = async () => {
        await dispatch (authTC())
        setValue(true)
    }

    if(value && !isLogged) {
        return <Redirect to={'log-in'}/>
    }*/

    const inRef = useRef<HTMLInputElement>(null)
    const [code, setCode] = useState(true);
    const [base64, setBase64] = useState(true); // base64 - true, text - false
    const [text, setText] = useState('');
    const [file, setFile] = useState();
    const [fileURL, setFileURL] = useState();
    const [file64, setFile64] = useState();
    const [fileData, setFileData] = useState();



    const upload =async  (e: ChangeEvent<HTMLInputElement>) => {

        const reader = new FileReader();
        reader.onloadend = () => {
            setFile64(reader.result);
        };
        const newFile = e.target.files && e.target.files[0];
        if( newFile){
            setFile(newFile);
            reader.readAsDataURL(newFile);
        }


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
        const response = loginAPI.setProfile({avatar:file64, name: 'Vik' })
    };

    return (
        <div className={style.container}>
          <div>
              <img src={file64} alt={'file'} width={'300px'}/>
              <div>name: {file && file.name}</div>
              <div>lastModified: {file && file.lastModified}</div>
              <div>size: {file && returnFileSize(file.size)}</div>
              <div>type: {file && file.type}</div>

              <input
                  ref={inRef}
                  type={'file'}
                  style={{display: 'none'}}
                  onChange={upload}
              />
          </div>
            <button onClick={() => inRef && inRef.current && inRef.current.click()}>add</button>
            <button onClick={send}>send</button>
        </div>
    );
}

export default Profile;