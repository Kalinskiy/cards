import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../m2-bll/store";
import {CardsType} from "../../Cards-API/Cards-API";
import {GameCard} from "./Game-card/GameCard";
import {getCardsTC, updateCardGrade} from "../../Cards-reducer/Cards-reducer";
import {useParams} from "react-router-dom";
import style from './Card-game.module.scss'
import {Preloader} from "../../../../n3-common_components/Preloader/Preloader";

const getCard = (cards: CardsType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    return cards[res.id + 1];
}

export const CardGame = () => {

    const params = useParams<{ packId: string }>()
    const dispatch = useDispatch()
    const cards = useSelector<AppStateType, CardsType[]>(state => state.cards.cards)
    const isMyCards = useSelector<AppStateType, boolean>(state => state.cards.isMyCards)

    const [currentCard, setCurrentCard] = useState<CardsType>(getCard(cards))


    useEffect(() => {
        dispatch(getCardsTC(params.packId, isMyCards))
    }, [params.packId])


    useEffect(() => {
        setCurrentCard(getCard(cards))
    }, [cards])


    const nextCardHandler = () => {
        setCurrentCard(getCard(cards))
    }

    const pickGradeHandler = (grade: number) => {
        dispatch(updateCardGrade(grade, currentCard._id, params.packId))
        setCurrentCard(getCard(cards))
    }


    return (
        <div className={style.container}>
            {currentCard ?
                <div>

                    <div className={style.cardContainer}>

                        <GameCard question={currentCard.question}
                                  answer={currentCard.answer}
                                  grade={currentCard.grade}
                                  id={currentCard._id}/>

                        <div className={ style.buttons}>

                            <div className={style.buttonElement}
                                 onClick={() => pickGradeHandler(1)}
                            ><div className={style.number}>1</div></div>

                            <div className={style.buttonElement}
                                 onClick={() => pickGradeHandler(2)}
                            ><div className={style.number}>2</div></div>

                            <div className={style.buttonElement}
                                 onClick={() => pickGradeHandler(3)}
                            ><div className={style.number}>3</div></div>

                            <div className={style.buttonElement}
                                 onClick={() => pickGradeHandler(4)}
                            ><div className={style.number}>4</div></div>

                            <div className={style.buttonElement}
                                 onClick={() => pickGradeHandler(5)}
                            ><div className={style.number}>5</div></div>

                        </div>
                    </div>





                    {/*<button onClick={() => pickGradeHandler(1)}>Не знал</button>
                    <button onClick={() => pickGradeHandler(2)}>Плохо знал</button>
                    <button onClick={() => pickGradeHandler(3)}>Затруднялся</button>
                    <button onClick={() => pickGradeHandler(4)}>Знал</button>
                    <button onClick={() => pickGradeHandler(5)}>Отлично знал</button>*/}
                </div>
                : <Preloader/>
            }
        </div>
    )
}