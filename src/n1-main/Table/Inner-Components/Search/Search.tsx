import React, {ChangeEvent, useState} from "react";
import s from './Search.module.css'
import {PackType} from "../../Table-API/API-Table";
import {useDispatch, useSelector} from "react-redux";
import {getPacksTC} from "../../Table-Reducer/TableReducer";
import {AppStateType} from "../../../m2-bll/store";



const Search = () => {
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const userId = useSelector<AppStateType, string | null>(state => state.login.auth._id)
    const page = useSelector<AppStateType, number>(state => state.table.page)

    const onChangeInput = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchName( e.currentTarget.value )
    }

    const search = () => {
        dispatch(getPacksTC(userId, 7, page, searchName))
    }

    return <div className={s.search}>
        <input onChange={onChangeInput} value={searchName} type="text"
               placeholder={'Search...'}/>
        <button onClick={search}>Find</button>
    </div>
}

export default Search