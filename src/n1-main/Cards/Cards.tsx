import React, {useEffect} from "react";
import style from "./Cards.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../m2-bll/store";
import {Card} from "./Inner-components/Card.tsx/Card";
import {CardDataType, CardsType} from "./Cards-API/Cards-API";
import {addCard, addCardTC, getCardsTC} from "./Cards-reducer/Cards-reducer";
import {AddCard} from "./Inner-components/Add-card/Add-Card";
import {NavLink, useParams} from "react-router-dom";

export const Cards = () => {
    const params = useParams<{ packId: string }>()
    const dispatch = useDispatch()
    const cards = useSelector<AppStateType, CardsType[]>(state => state.cards.cards)

    const addCard1 = useSelector<AppStateType, boolean>(state => state.cards.addCard)

    useEffect(() => {
        dispatch(getCardsTC(params.packId))
    }, [params.packId])



    const addCardHandler = () => {

        dispatch(addCard(true))
    }

    return (
        <div className={style.container}>
            <button onClick={addCardHandler}>add card</button>
            <NavLink onClick={() => {
            }}
                     to={'/card-game'}
            >
                Start learning
            </NavLink>
            {
                cards.map(e => <Card question={e.question}
                                     answer={e.answer}
                                     id={e._id}
                                     key={e._id}
                />)
            }
            {addCard1 && <AddCard/>}

        </div>
    )
}
