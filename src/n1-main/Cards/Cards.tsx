import React from "react";
import style from "./Cards.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../m2-bll/store";
import {Card} from "./Inner-components/Card.tsx/Card";
import {CardDataType, CardsType} from "./Cards-API/Cards-API";
import {addCard, addCardTC} from "./Cards-reducer/Cards-reducer";
import {AddCard} from "./Inner-components/Add-card/Add-Card";
import {Preloader} from "../../n3-common_components/Preloader/Preloader";

export const Cards = () => {

    const cards = useSelector<AppStateType, CardsType[]>(state => state.cards.cards)
    const triggerPreloader = useSelector<AppStateType, boolean>(state => state.preloader.trigger)
    const addCard1 = useSelector<AppStateType, boolean>(state => state.cards.addCard)

    const dispatch = useDispatch()

    const addCardHandler = () => {

        dispatch(addCard(true))
    }

    return (<>
        {
            triggerPreloader ? <Preloader/> : <div className={style.container}>
                <button onClick={addCardHandler}>add card</button>
                {
                    cards.map(e => <Card question={e.question}
                                         answer={e.answer}
                                         id={e._id}
                                         key={e._id}
                    />)
                }
                {addCard1 && <AddCard/>}

            </div>}
    </>)

}
