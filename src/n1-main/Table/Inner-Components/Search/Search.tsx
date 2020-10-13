import React, {ChangeEvent, useState} from "react";
import style from './Search.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getPacksTC} from "../../Table-Reducer/TableReducer";
import {AppStateType} from "../../../m2-bll/store";
import searchIcon from '../../../../n2-assets/icons/search.svg'


const Search = () => {
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const userId = useSelector<AppStateType, string | null>(state => state.login.auth._id)
    const page = useSelector<AppStateType, number>(state => state.table.page)

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.currentTarget.value)
    }

    const search = () => {
        dispatch(getPacksTC(userId, 7, page, searchName))
    }

    return <div className={style.search}>
        <input onChange={onChangeInput} value={searchName} type="text"
               placeholder={'Search...'}/>
        <button onClick={search} className={style.searchButton}>
            <img src={searchIcon} className={style.searchIcon}/>
        </button>
    </div>
}

export default Search