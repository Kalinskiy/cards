import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../m2-bll/store";
import {changeCurrentCard, selectorCard} from "../../Cards-reducer/Cards-reducer";
import {CardsType} from "../../Cards-API/Cards-API";
import {Card} from "../Card.tsx/Card";

const getCard = (cards: CardsType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

export const CardGame = () => {

    const cards = useSelector<AppStateType, CardsType[]>(state => state.cards.cards)
    const currentCardNumber = useSelector<AppStateType, number>(state => state.cards.currentCard)
    const dispatch = useDispatch()
    const [currentCard, setCurrentCard] = useState<CardsType>(getCard(cards))



    const nextCardHandler = () => {
        setCurrentCard(getCard(cards))
        // if (currentCardNumber !== cards.length - 1) {
        //     dispatch(changeCurrentCard(currentCardNumber + 1))
        // }
    }

    const previousCardHandler = () => {
        // if (currentCardNumber !== 0) {
        //     dispatch(changeCurrentCard(currentCardNumber - 1))
        // }
    }

    return (
        <div>
            <button onClick={previousCardHandler}>Previous</button>
                <Card question={currentCard.question}
                      answer={currentCard.answer}
                      id={currentCard._id}/>
            <button onClick={nextCardHandler}>Next</button>
        </div>
    )
}