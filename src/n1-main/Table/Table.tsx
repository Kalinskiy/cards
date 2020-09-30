import React, {useEffect, useState} from "react";
import style from "./Table.module.scss"
import {Pack} from "./Pack/Pack";
import {useDispatch, useSelector} from "react-redux";
import {deletePackTC, getPacksTC} from "./Reducer/TableReducer";
import {AppStateType} from "../m2-bll/store";
import {PackType} from "./API/API-Table";
import {AddPackForm} from "./Add-Pack/Add-pack";
import Search from "./Search/Search";
import ReactSimplePagination from "../../n3-common_components/Pagination/Pagination";



export const Table = () => {
    //search
    const [searchValue, setSearchValue] = useState('')
    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
         setSearchValue(e.currentTarget.value)
    }
 //--------------------------------------------------------------------------------------------------------------------

    const dispatch = useDispatch()

    const packs = useSelector<AppStateType, PackType[]>(state => state.table.packs)
    const userId = useSelector<AppStateType, string | null>(state => state.login.auth._id)
    const totalCards = useSelector<AppStateType, number | null>(state => state.table.packsCount)
    const packNames = packs.map(pack=>pack.name)
    console.log(packNames)


    useEffect(() => {
        userId && dispatch(getPacksTC(userId))
    }, [userId])

    const deleteHandler = (packId: string | null, userId: string | null) => {
        dispatch(deletePackTC(packId, userId))
    }

    const handleChangePage = ( page: number) => {
        dispatch(getPacksTC(userId, 7, page ))
    }

    return (
        <div className={style.container}>
            <Search packs={packs} value={searchValue} setInputValue={setSearchValue} onChangeSearch={onChangeSearch}/>
            <table>
                <thead className={style.header}>
                <tr>
                    <th>Name</th>
                    <th>Cards Count</th>
                    <th>Last update</th>
                </tr>
                </thead>
                {
                    packs.filter( e => e.name.includes(searchValue)).map(e => <Pack key={e._id}
                                            packId={e._id}
                                            name={e.name}
                                            cardsCount={e.cardsCount}
                                            lastUpdate={e.updated}
                                            userId={userId}
                                            onClick={deleteHandler}
                    />)
                }
            </table>
            <AddPackForm/>
              <ReactSimplePagination
                page={totalCards ? Math.ceil(totalCards/7 ) : 0}
                maxPage={10}
                onClickAction={handleChangePage}
            />

        </div>
    )
}