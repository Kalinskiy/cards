import React from "react";
import style from "./Pack.module.scss"
import {AddCardDataType, CardDataType, CardsType} from "../../../Cards/Cards-API/Cards-API";
import s from "../../../Header/header.module.css";
import {NavLink} from "react-router-dom";

export type PackType = {
    name: string
    packId: string
    cardsCount: number
    lastUpdate: string
    userId: string | null
    onClickDeleteHandler: (packId: string | null, userId: string | null) => void
    onClickUpdateHandler: (packId: string | null) => void
    onClickAddCardHandler: (addCardData: CardDataType) => void
    getCardsOnClick: (packid: string, pageCount: number) => void
}



export const Pack = (props: PackType) => {
    const onClickDeleteHandler = () => {
        props.onClickDeleteHandler(props.packId, props.userId)
    }

    const onClickUpdateHandler = () => {
        props.onClickUpdateHandler(props.packId)
    }

    const getCardsOnClick = () => {
        props.getCardsOnClick(props.packId, 10)
    }


    return (

        <tr className={style.body}>
            <td>{props.name}</td>
            <td>{props.cardsCount}</td>
            <td>{props.lastUpdate}</td>
            <td>
                <button onClick={onClickDeleteHandler}>Delete</button>
            </td>
            <td>
                <button onClick={onClickUpdateHandler}>Update</button>
            </td>
            <td>
                <NavLink onClick={getCardsOnClick}
                         to={`cards/${props.packId}`}
                >
                    Cards
                </NavLink>
            </td>
        </tr>

    )
}