import React from "react";
import style from "./Pack.module.scss"

export type PackType = {
    name: string
    cardsCount: number
    lastUpdate: string
}

export const Pack = (props: PackType) => {
    return (
        <tbody className={style.body}>
            <tr>
                <td>{props.name}</td>
                <td>{props.cardsCount}</td>
                <td>{props.lastUpdate}</td>
                <td>
                    {/*<button onClick={() => props.handleOnClick(props.id)}>Delete</button>*/}
                </td>
                <td>
                    <button>Update</button>
                </td>
                <td>cards</td>
            </tr>
        </tbody>
    )
}