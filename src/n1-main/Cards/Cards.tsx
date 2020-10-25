import React, {useEffect, useState} from "react";
import style from "./Cards.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../m2-bll/store";
import {Card} from "./Inner-components/Card.tsx/Card";
import {CardsType} from "./Cards-API/Cards-API";
import {getCardsTC} from "./Cards-reducer/Cards-reducer";
import {AddCard} from "./Inner-components/Add-card/Add-Card";
import {Preloader} from "../../n3-common_components/Preloader/Preloader";
import {useParams} from "react-router-dom";
import {ModalWithChildren} from "../../n3-common_components/Modal/Modal";
import {LoginAuthStateType} from "../Login/Reducer/login-reducer";
import {BackButton} from "../../n3-common_components/Back-button/BackButton";
import {AddButton} from "../../n3-common_components/Add-button/AddButton";
import {PlayButton} from "../../n3-common_components/Play-button/PlayButton";
import {PackType} from "../Table/Table-API/API-Table";
import {getPacksTC} from "../Table/Table-Reducer/TableReducer";


export const Cards = () => {
    console.log('Cards')
    const [addCardState, setAddCardState] = useState(false)
    const [title, setTitle] = useState('')
    //const [title, setTitle] = useState<string | null>(null)


    const params = useParams<{ packId: string }>()

    const dispatch = useDispatch()

    const userId = useSelector<AppStateType, string | null>(state => state.login.auth._id)
    const packs = useSelector<AppStateType, PackType[]>(state => state.table.packs)
    const isMyCards = useSelector<AppStateType, boolean>(state => state.cards.isMyCards)
    const isMyPacks = useSelector<AppStateType, boolean>(state => state.table.isMyPacks)
    const cards = useSelector<AppStateType, CardsType[]>(state => state.cards.cards)
    const auth = useSelector<AppStateType, LoginAuthStateType>(state => state.login.auth)
    const triggerPreloader = useSelector<AppStateType, boolean>(state => state.preloader.trigger)




    useEffect(() => {
        debugger
        auth && dispatch(getCardsTC(params.packId, isMyCards))
        // userId && dispatch(getPacksTC(userId))
    }, [params.packId, auth, userId])

   /* useEffect(() => {
        let title = packs.find((e) => e._id === params.packId)?.name
        title && setTitle(title)
    }, [packs])*/

    const showModalAddCard = () => {
        setAddCardState(true)
    }
    const hideModalAddCard = () => {
        setAddCardState(false)
    }
    const handleChangePage = (page: number) => {
        //  dispatch(getCardsTC(userId, 8, page))
    }

    return (
        <>
            {!auth && <div className={style.preloader}><Preloader/></div>}

            {
                triggerPreloader
                    ? <div className={style.preloader}><Preloader/></div>
                    : <div className={style.container}>

                        {/*<div className={style.title}>*/}
                        {/*    {title}*/}
                        {/*</div>*/}

                        <div className={style.buttonsContainer}>
                            <BackButton to={'/table'}/>
                            {
                                isMyCards && <AddButton onClick={showModalAddCard}
                                                         length={cards.length}
                                                         message={'Add Card here'}/>
                            }


                            <PlayButton to={`/card-game/${params.packId}`}/>
                        </div>

                        <ModalWithChildren
                            modalActive={addCardState}
                            setModalActive={setAddCardState}
                            onCancel={() => {
                                setAddCardState(false)
                            }}
                        >
                            <AddCard hideModalAddCard={hideModalAddCard}/>
                        </ModalWithChildren>

                        <div className={style.cards}>
                            {
                                !!cards.length && cards.map(e => <Card question={e.question}
                                                                       answer={e.answer}
                                                                       id={e._id}
                                                                       key={e._id}
                                                                       grade={e.grade}
                                />)
                            }
                        </div>


                    </div>
            }
        </>
    )
}

