import React, {useEffect, useState} from "react";
import style from "./Table.module.scss"
import {Pack} from "./Inner-Components/Pack/Pack";
import {useDispatch, useSelector} from "react-redux";
import {deletePackTC, getPacksTC} from "./Table-Reducer/TableReducer";
import {AppStateType} from "../m2-bll/store";
import {PackType} from "./Table-API/API-Table";
import {AddPackForm} from "./Inner-Components/Add-Pack/Add-pack";
import Search from "./Inner-Components/Search/Search";
import ReactSimplePagination from "../../n3-common_components/Pagination/Pagination";
import {RenameWindow} from "../../n3-common_components/Rename-window/Rename-window";
import {changeTrigger, savePackId} from "../../n3-common_components/Rename-window/Reducer/Rename-Reducer";
import {Preloader} from "../../n3-common_components/Preloader/Preloader";
import {addCardTC, getCardsTC} from "../Cards/Cards-reducer/Cards-reducer";
import {CardDataType} from "../Cards/Cards-API/Cards-API";


export const Table = () => {

    const [searchValue, setSearchValue] = useState('')
    const [isAddCardOpen, setIsAddCardOpen] = useState(false)

    const dispatch = useDispatch()

    const page = useSelector<AppStateType, number | null>(state => state.table.page)
    const packs = useSelector<AppStateType, PackType[]>(state => state.table.packs)
    const triggerRename = useSelector<AppStateType, boolean>(state => state.rename.trigger)
    const triggerPreloader = useSelector<AppStateType, boolean>(state => state.preloader.trigger)
    const userId = useSelector<AppStateType, string | null>(state => state.login.auth._id)
    const totalCards = useSelector<AppStateType, number | null>(state => state.table.packsCount)

    useEffect(() => {
        userId && dispatch(getPacksTC(userId))
    }, [userId])

    const onClickDeleteHandler = (packId: string | null, userId: string | null) => {
        dispatch(deletePackTC(packId, userId))
    }
    const addPackOnClick = () => {
        setIsAddCardOpen(!isAddCardOpen)
    }

    const onClickUpdateHandler = (packId: string | null) => {
        dispatch(savePackId(packId))
        dispatch(changeTrigger(true))
    }

    const getCardsOnClick = (packId: string, pageCount: number) => {
        dispatch(getCardsTC(packId, pageCount))
    }

    const onClickAddCardHandler = (card: CardDataType) => {
        dispatch(addCardTC(card))
    }

    const handleChangePage = (page: number) => {
        dispatch(getPacksTC(userId, 7, page))
    }

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    return (

        <div className={style.container}>

            <Search packs={packs}
                    value={searchValue}
                    setInputValue={setSearchValue}
                    onChangeSearch={onChangeSearch}/>
            <button className={style.buttonPlus} onClick={addPackOnClick}>Add +</button>
            <table>
                <thead className={style.header}>
                <tr>
                    <th>Name</th>
                    <th>Cards Count</th>
                    <th>Last update</th>
                    <th></th>
                    <th></th>
                    <th></th>

                </tr>
                </thead>
                <tbody>
                {
                    packs
                        .filter(e =>
                            e.name.includes(searchValue))
                        .map(e =>
                            <Pack key={e._id}
                                  packId={e._id}
                                  name={e.name}
                                  cardsCount={e.cardsCount}
                                  lastUpdate={e.updated}
                                  userId={userId}
                                  onClickDeleteHandler={onClickDeleteHandler}
                                  onClickUpdateHandler={onClickUpdateHandler}
                                  onClickAddCardHandler={onClickAddCardHandler}
                                  getCardsOnClick={getCardsOnClick}
                            />)
                }
                </tbody>
            </table>
            {isAddCardOpen && <AddPackForm/>}

            {triggerRename && <div className={style.rename}><RenameWindow/></div>}
            {triggerPreloader && <Preloader/>}
            <ReactSimplePagination
                page={page ? page : 0}
                maxPage={totalCards ? Math.ceil(totalCards / 7) : 0}
                onClickAction={handleChangePage}
            />
        </div>

    )
}
