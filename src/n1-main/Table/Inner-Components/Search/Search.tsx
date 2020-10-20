import React, {ChangeEvent, useState} from "react";
import style from './Search.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getPacksTC} from "../../Table-Reducer/TableReducer";
import {AppStateType} from "../../../m2-bll/store";


const Search = () => {
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const userId = useSelector<AppStateType, string | null>(state => state.login.auth._id)
    const page = useSelector<AppStateType, number>(state => state.table.page)

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {

        setSearchName(e.currentTarget.value)
    }


    // const search = () => {
    //     dispatch(getPacksTC(userId, 8, page, searchName))
    // }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            dispatch(getPacksTC(userId, 8, page,true, searchName))
        }
    }

    return <div className={style.search}>
        <input onChange={onChangeInput} value={searchName} type="text"
               placeholder={'Search...'} onKeyPress={onKeyPressHandler}/>

    </div>
}

export default Search