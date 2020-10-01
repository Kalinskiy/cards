import React, {useEffect, useState} from "react";
import style from "./Table.module.scss"
import {Pack} from "./Pack/Pack";
import {useDispatch, useSelector} from "react-redux";
import {deletePackTC, getPacksTC, getPage} from "./Reducer/TableReducer";
import {AppStateType} from "../m2-bll/store";
import {PackType} from "./API/API-Table";
import {AddPackForm} from "./Add-Pack/Add-pack";
import Search from "./Search/Search";
import ReactSimplePagination from "../../n3-common_components/Pagination/Pagination";
import {RenameWindow} from "../../n3-common_components/Rename-window/Rename-window";
import {changeTrigger, savePackId} from "../../n3-common_components/Rename-window/Reducer/Rename-Reducer";
import {Preloader} from "../../n3-common_components/Preloader/Preloader";

export const Table = () => {
    //search
    const [searchValue, setSearchValue] = useState('')
    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }
    //--------------------------------------------------------------------------------------------------------------------

    const dispatch = useDispatch()
    const page = useSelector<AppStateType, number | null>(state => state.table.page)
    const packs = useSelector<AppStateType, PackType[]>(state => state.table.packs)
    const triggerRename = useSelector<AppStateType, boolean>(state => state.rename.trigger)
    const triggerPreloader = useSelector<AppStateType, boolean>(state => state.preloader.trigger)
    const userId = useSelector<AppStateType, string | null>(state => state.login.auth._id)
    const totalCards = useSelector<AppStateType, number | null>(state => state.table.packsCount)
    const packNames = packs.map(pack => pack.name)
    console.log(packNames)


    useEffect(() => {
        userId && dispatch(getPacksTC(userId))
    }, [userId])

    const onClickDeleteHandler = (packId: string | null, userId: string | null) => {
        dispatch(deletePackTC(packId, userId))
    }

    const onClickUpdateHandler = (packId: string | null) => {
        dispatch(savePackId(packId))
        dispatch(changeTrigger(true))
    }

    const handleChangePage = (page: number) => {
        dispatch(getPacksTC(userId, 7, page))

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
                    packs.filter(e => e.name.includes(searchValue)).map(e => <Pack key={e._id}
                                                                                   packId={e._id}
                                                                                   name={e.name}
                                                                                   cardsCount={e.cardsCount}
                                                                                   lastUpdate={e.updated}
                                                                                   userId={userId}
                                                                                   onClickDeleteHandler={onClickDeleteHandler}
                                                                                   onClickUpdateHandler={onClickUpdateHandler}
                    />)
                }
            </table>
            <AddPackForm/>
            <ReactSimplePagination
                page={page ? page : 0}
                maxPage={totalCards ? Math.ceil(totalCards / 7) : 0}
                onClickAction={handleChangePage}
            />
            {triggerRename && <RenameWindow/>}
            {triggerPreloader && <Preloader/>}

        </div>
    )
}
//         < div
//     className = {style.container} >
//         < table >
//         < thead
//     className = {style.header} >
//         < tr >
//         < th > Name < / th >
//         < th > Cards
//     Count < / th >
//     < th > Last
//     update < / th >
//     < / tr >
//     < / thead >
//     {
//         packs.map(e => <Pack key={e._id}
//                              packId={e._id}
//                              name={e.name}
//                              cardsCount={e.cardsCount}
//                              lastUpdate={e.updated}
//                              userId={userId}
//                              onClickDeleteHandler={onClickDeleteHandler}
//                              onClickUpdateHandler={onClickUpdateHandler}
//         />)
//     }
// </table>
// <AddPackForm/>
// {triggerRename && <RenameWindow/>}
// {triggerPreloader && <Preloader/>}
//
//
// </div>
// )
// }