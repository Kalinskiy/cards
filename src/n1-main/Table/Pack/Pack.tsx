import React from "react";
import style from "./Pack.module.scss"

export type PackType = {
    name: string
    packId: string
    cardsCount: number
    lastUpdate: string
    userId: string | null
    onClick: (packId: string | null, userId: string | null) => void
}



export const Pack = (props: PackType) => {

    const onClickHandler = () => {
        props.onClick(props.packId, props.userId)
    }

    return (
        <tbody className={style.body}>
            <tr>
                <td>{props.name}</td>
                <td>{props.cardsCount}</td>
                <td>{props.lastUpdate}</td>
                <td>
                    <button onClick={onClickHandler}>Delete</button>
                </td>
                <td>
                    <button>Update</button>
                </td>
                <td>cards</td>
            </tr>
        </tbody>
    )
}