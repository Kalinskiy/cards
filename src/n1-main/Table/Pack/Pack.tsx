import React from "react";
import style from "./Pack.module.scss"

export type PackType = {
    name: string
    packId: string
    cardsCount: number
    lastUpdate: string
    userId: string | null
    onClickDeleteHandler: (packId: string | null, userId: string | null) => void
    onClickUpdateHandler: (packId:string | null) => void
}



export const Pack = (props: PackType) => {

    const onClickDeleteHandler = () => {
        props.onClickDeleteHandler(props.packId, props.userId)
    }

    const onClickUpdateHandler = () => {
        props.onClickUpdateHandler(props.packId)
    }

    return (

            <tr>
                <td>{props.name}</td>
                <td>{props.cardsCount}</td>
                <td>{props.lastUpdate}</td>
                <td>
                    <button onClick={onClickDeleteHandler}>Delete</button>
                </td>
                <td>
                    <button onClick={onClickUpdateHandler}>Update</button>
                </td>
                <td>cards</td>
            </tr>
        //className={style.body}
    )
}