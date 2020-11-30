import React, {ChangeEvent, useEffect, useState} from "react";
import style from "./Table.module.scss"
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
import {AddButton} from '../../n3-common_components/Add-button/AddButton';
import {AllButton} from '../../n3-common_components/All-button/AllButton';
import onePack from '../../n2-assets/icons/one.png';
import all from '../../n2-assets/icons/all.png'


export const Table = () => {
    const dispatch = useDispatch()


    const [isAddModalActive, isAddSetModalActive] = useState(false)
    const [isDeleteModalActive, isDeleteSetModalActive] = useState(false)
    const [addPackValue, setAddPackValue] = useState('')
    const [isAllPacks, setIsAllPacks] = useState(false)
    const [searchName, setSearchName] = useState('')

    const isMyCards = useSelector<AppStateType, boolean>(state => state.cards.isMyCards)
    const isMyPacks = useSelector<AppStateType, boolean>(state => state.table.isMyPacks)
    const search = useSelector<AppStateType, string | null>(state => state.table.search)
    const page = useSelector<AppStateType, number | null>(state => state.table.page)
    const packs = useSelector<AppStateType, PackType[]>(state => state.table.packs)
    const triggerRename = useSelector<AppStateType, boolean>(state => state.rename.trigger)
    const triggerPreloader = useSelector<AppStateType, boolean>(state => state.preloader.trigger)
    const userId = useSelector<AppStateType, string | null>(state => state.login.auth._id)
    const totalPacks = useSelector<AppStateType, number | null>(state => state.table.packsCount)
    const isLogged = useSelector<AppStateType, boolean>(state => state.login.isLogged)
    const initialized = useSelector<AppStateType, boolean>(state => state.app.initialized)

    useEffect(() => {
        userId && dispatch(getPacksTC(userId))
        /*if (isMyPacks && userId) {
            userId && dispatch(getPacksTC(userId))
        } else {
            dispatch(getPacksAllTC(9, 1))
        }*/

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
        dispatch(getPacksAllTC(9, 1))
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

        dispatch(getCardsTC(packId, isMyCards, pageCount))

    }

    const onClickAddCardHandler = (card: CardDataType) => {
        isAddSetModalActive(true)
        dispatch(addCardTC(card))
    }

    const handleChangePage = (page: number) => {
        dispatch(getPacksTC(userId, 9, page, isMyPacks, searchName))
    }
    const handleChangePageAll = (page: number) => {
        dispatch(getPacksAllTC(9, page, searchName))
    }


    return (

        <div className={common.container}>

            {/* {!initialized && <div className={style.preloader}><Preloader/></div>}*/}


            <ModalInput modalActive={isAddModalActive}
                        onChange={onChangeValueHandler}
                        setModalActive={isAddSetModalActive}
                        onClick={addPackOnClick}
                        onCancel={() => isAddSetModalActive(false)}
                        value={addPackValue}
            >
                <p>Do you want to add this pack?</p>
            </ModalInput>

            {
                /*triggerPreloader
                    ? <Preloader/>*/
                /*:*/ <div className={style.wrapper}>
                <Search setIsAllPacks={setIsAllPacks} isAllPacks={isAllPacks} searchName={searchName}
                        setSearchName={setSearchName}/>
                {
                    search
                        ? search
                        : ''
                }

                <div className={style.buttonsContainer}>

                    <AllButton onClick={!isAllPacks ? onClickAllPacks : onClickPacks}
                               icon={!isAllPacks ? all : onePack}
                    />

                    <div className={!isMyPacks ? style.addButton : ''}>

                        {
                            !isAllPacks && <AddButton
                                onClick={() => isAddSetModalActive(true)}
                                message={'Add card here'}
                                length={packs.length}
                                searchName={searchName}
                            />
                        }

                    </div>

                </div>

                {

                    triggerPreloader
                        ? <Preloader/>
                        :<div className={style.packs}>

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
                    </div>

                }

                {
                    triggerRename && <div className={style.rename}><RenameWindow/></div>
                }
                {
                    packs.length

                        ? <ReactSimplePagination
                            page={page ? page : 0}
                            maxPage={totalPacks ? Math.ceil(totalPacks / 9) : 0}
                            onClickAction={isAllPacks ? handleChangePageAll : handleChangePage}
                        />
                        : null
                }

            </div>

            }

        </div>

    )

}
