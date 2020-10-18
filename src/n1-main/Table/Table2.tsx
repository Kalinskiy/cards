import React, {ChangeEvent, useEffect, useState} from "react";
import style from "./Table.module.css"
import {Pack2} from "./Inner-Components/Pack/Pack";
import {useDispatch, useSelector} from "react-redux";
import {addPackTC, changePackNameTC, deletePackTC, getPacksAllTC, getPacksTC} from "./Table-Reducer/TableReducer";
import {AppStateType} from "../m2-bll/store";
import {PackType, RenamePackDataType} from "./Table-API/API-Table";
import Search from "./Inner-Components/Search/Search";
import ReactSimplePagination from "../../n3-common_components/Pagination/Pagination";
import {RenameWindow} from "../../n3-common_components/Rename-window/Rename-window";
import {Preloader} from "../../n3-common_components/Preloader/Preloader";
import {addCardTC, getCardsTC} from "../Cards/Cards-reducer/Cards-reducer";
import {CardDataType} from "../Cards/Cards-API/Cards-API";
import common from '../../n3-common_components/CommonStyles/common.module.css'
import {ModalInput} from "../../n3-common_components/Modal/Modal";
import {Redirect} from "react-router-dom";


export const Table = () => {
    const dispatch = useDispatch()


    const [isAddModalActive, isAddSetModalActive] = useState(false)
    const [isDeleteModalActive, isDeleteSetModalActive] = useState(false)
    const [addPackValue, setAddPackValue] = useState('')
    const [isAllPacks, setIsAllPacks] = useState(false)


    const page = useSelector<AppStateType, number | null>(state => state.table.page)
    const packs = useSelector<AppStateType, PackType[]>(state => state.table.packs)
    const triggerRename = useSelector<AppStateType, boolean>(state => state.rename.trigger)
    const triggerPreloader = useSelector<AppStateType, boolean>(state => state.preloader.trigger)
    const userId = useSelector<AppStateType, string | null>(state => state.login.auth._id)
    const totalPacks = useSelector<AppStateType, number | null>(state => state.table.packsCount)
    const isLogged = useSelector<AppStateType, boolean>(state => state.login.isLogged)
    const initialized = useSelector<AppStateType, boolean>(state => state.app.initialized)
    console.log(packs)
    useEffect(() => {
        userId && dispatch(getPacksTC(userId))
    }, [userId])


    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAddPackValue(e.currentTarget.value)
    }

    const onClickDeleteHandler = (packId: string | null, userId: string | null) => {
        dispatch(deletePackTC(packId, userId))
    }
    const addPackOnClick = () => {
        dispatch(addPackTC(userId, addPackValue))
        isAddSetModalActive(!isAddSetModalActive)
    }
    const onClickAllPacks = () => {
        dispatch(getPacksAllTC(7, 1))
        setIsAllPacks(true)
    }
    const onClickPacks = () => {
        dispatch(getPacksTC(userId))
        setIsAllPacks(false)
    }

    const onClickUpdateHandler = (obj: RenamePackDataType) => {
        dispatch(changePackNameTC(obj, userId))
    }

    const getCardsOnClick = (packId: string, pageCount: number) => {
        dispatch(getCardsTC(packId, pageCount))

    }

    const onClickAddCardHandler = (card: CardDataType) => {
        isAddSetModalActive(true)
        dispatch(addCardTC(card))
    }

    const handleChangePage = (page: number) => {
        dispatch(getPacksTC(userId, 7, page))
    }
    const handleChangePageAll = (page: number) => {
        dispatch(getPacksAllTC(7, page))
    }


    return (

        <div className={common.container2}>
            {!isLogged ? <Redirect to={"/log-in"}/> : null}
            {!initialized && <Preloader/>}
            <ModalInput modalActive={isAddModalActive}
                        onChange={onChangeValueHandler}
                        setModalActive={isAddSetModalActive}
                        onClick={addPackOnClick}
                        onCancel={() => isAddSetModalActive(false)}
                        value={addPackValue}
            >
                <p>Do you want to add this pack?</p>
            </ModalInput>

            {triggerPreloader ? <Preloader/> : <div style={{padding: '100px 0', display:"flex",flexDirection:'column',width:'100%', alignItems:'center'}}>
                <Search/>
                <div className={style.add}>
                    <button className={style.buttonPlus} onClick={() => isAddSetModalActive(true)}>+</button>
                    <button
                        onClick={!isAllPacks ? onClickAllPacks : onClickPacks}>{!isAllPacks ? 'show all packs' : 'show my packs'}</button>
                </div>

                <div className={style.tableWrapper}>
                    <table>
                        <thead className={style.header}>
                        <tr>
                            <th>Picture</th>
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
                            packs.map(e =>
                                <Pack2 key={e._id}
                                       packId={e._id}
                                       name={e.name}
                                       cardsCount={e.cardsCount}
                                       lastUpdate={e.updated}
                                       userId={userId}
                                       onClickDeleteHandler={onClickDeleteHandler}
                                       isDeleteModalActive={isDeleteModalActive}
                                       isDeleteSetModalActive={isDeleteSetModalActive}
                                       onClickUpdateHandler={onClickUpdateHandler}
                                       onClickAddCardHandler={onClickAddCardHandler}
                                       getCardsOnClick={getCardsOnClick}


                                />)
                        }
                        </tbody>
                    </table>
                </div>


                {triggerRename && <div className={style.rename}><RenameWindow/></div>}
                {page
                    ? <ReactSimplePagination
                        page={page}
                        maxPage={totalPacks ? Math.ceil(totalPacks / 7) : 0}
                        onClickAction={isAllPacks ? handleChangePageAll : handleChangePage}
                    />
                    : null
                }
            </div>}
        </div>


    )
}
