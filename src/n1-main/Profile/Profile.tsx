import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../m2-bll/store";
import {authTC} from "../Login/Reducer/login-reducer";
import common from '../../n3-common_components/CommonStyles/common.module.css'

const Profile = () => {
    const isLogged =  useSelector<AppStateType,boolean>(state=>state.login.isLogged)
    const dispatch = useDispatch()
    const [value, setValue] = useState(false)



    //
    // useEffect(()=>{
    //     handleAuth()
    // },[])

    const handleAuth = async () => {
        await dispatch (authTC())
        setValue(true)
    }

    if(value && !isLogged) {
        return <Redirect to={'log-in'}/>
    }

    return (
        <div className={common.container}>
            PROFILE
        </div>
    );
}

export default Profile;