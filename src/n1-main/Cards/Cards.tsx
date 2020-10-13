import React, {useEffect, useState} from "react";
import style from "./Cards.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../m2-bll/store";
import {Card} from "./Inner-components/Card.tsx/Card";
import {CardsType} from "./Cards-API/Cards-API";
import {addCard, getCardsTC} from "./Cards-reducer/Cards-reducer";
import {AddCard} from "./Inner-components/Add-card/Add-Card";
import {Preloader} from "../../n3-common_components/Preloader/Preloader";
import {NavLink, useParams} from "react-router-dom";
import icon from '../../n2-assets/images/finger.png'
import {Modal, ModalWithChildren} from "../../n3-common_components/Modal/Modal";
import {LoginAuthStateType} from "../Login/Reducer/login-reducer";

export const Cards = () => {
    const [addCardState, setAddCardState] = useState(false)


    const params = useParams<{ packId: string }>()

    const dispatch = useDispatch()

    const cards = useSelector<AppStateType, CardsType[]>(state => state.cards.cards)
    const auth = useSelector<AppStateType, LoginAuthStateType>(state => state.login.auth)
    const triggerPreloader = useSelector<AppStateType, boolean>(state => state.preloader.trigger)
    const initialized = useSelector<AppStateType, boolean>(state => state.app.initialized)


    useEffect(() => {
        auth && dispatch(getCardsTC(params.packId))
    }, [params.packId, auth])


    const showModalAddCard = () => {
        setAddCardState(true)
    }
    const hideModalAddCard = () => {
        setAddCardState(false)
    }

    return (
        <>  {!auth && <Preloader/>}
            {triggerPreloader ? <Preloader/> :
                <div className={style.container}>
                    <ModalWithChildren
                        modalActive={addCardState}
                        setModalActive={setAddCardState}
                    >
                        <AddCard hideModalAddCard={hideModalAddCard}/>

                    </ModalWithChildren>


                    <button onClick={showModalAddCard}>add card</button>
                    <NavLink className={style.link} onClick={() => {
                    }}
                             to={`/card-game/${params.packId}`}
                    >
                        <span>Start learning <img className={style.icon} src={icon} alt=""/></span>
                    </NavLink>
                    {
                        cards.length && cards.map(e => <Card question={e.question}
                                             answer={e.answer}
                                             id={e._id}
                                             key={e._id}
                                             grade={e.grade}
                        />)
                    }


                </div>}

        </>
    )


}

