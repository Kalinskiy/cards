import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import style from './Search.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getPacksAllTC, getPacksTC, setErrorSearch, setIsSearch} from "../../Table-Reducer/TableReducer";
import {AppStateType} from "../../../m2-bll/store";
import {PackType} from "../../Table-API/API-Table";

type PropsType = {
    isAllPacks: boolean
    setIsAllPacks: (isAllPacks: boolean) => void
    setSearchName: (name: string) => void
    searchName: string
}

const Search = React.memo((props: PropsType) => {
    const dispatch = useDispatch()

    const userId = useSelector<AppStateType, string | null>(state => state.login.auth._id)
    const page = useSelector<AppStateType, number>(state => state.table.page)
    const packs = useSelector<AppStateType, PackType[]>(state => state.table.packs)
    const isSearch = useSelector<AppStateType, boolean>(state => state.table.isSearch)

    const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.setSearchName(e.currentTarget.value)
    }, [props.setSearchName])

    useEffect(() => {
        if (!packs.length && isSearch) {
            dispatch(setErrorSearch('No such packs, please try once again with different name'))
        } else {
            dispatch(setErrorSearch(null))
        }
    }, [isSearch])


    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            dispatch(setIsSearch(true))
            dispatch(getPacksTC(userId, 8, page, true, props.searchName))

        }
    }
    const onKeyPressHandlerAll = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            dispatch(getPacksAllTC(8, page, props.searchName))
            if (!props.searchName) {
                dispatch(setErrorSearch('No such packs, please try once again with different name'))
            }
            dispatch(setErrorSearch(null))
        }
    }

    return <div className={style.search}>
        <input onChange={onChangeInput} value={props.searchName} type="text"
               placeholder={'Search...'} onKeyPress={!props.isAllPacks ? onKeyPressHandler : onKeyPressHandlerAll}/>

    </div>
})

export default Search