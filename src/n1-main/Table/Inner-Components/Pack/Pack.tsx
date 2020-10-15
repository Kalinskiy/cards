import React, {ChangeEvent, useState} from "react";
import style from "./Pack.module.scss"
import {CardDataType} from "../../../Cards/Cards-API/Cards-API";
import {NavLink} from "react-router-dom";
import {Modal, ModalInput} from "../../../../n3-common_components/Modal/Modal";
import {RenamePackDataType} from "../../Table-API/API-Table";
import deleteIcon from '../../../../n2-assets/icons/delete.svg'
import edit from '../../../../n2-assets/icons/edit.svg'
import parseISO from "date-fns/parseISO";


export type PackType = {

    name: string
    packId: string
    cardsCount: number
    lastUpdate: string
    userId: string | null
    onClickDeleteHandler: (packId: string | null, userId: string | null) => void
    isDeleteModalActive: boolean
    isDeleteSetModalActive: (isDeleteModalActive: boolean) => void
    onClickUpdateHandler: (obj: RenamePackDataType) => void
    onClickAddCardHandler: (addCardData: CardDataType) => void
    getCardsOnClick: (packid: string, pageCount: number) => void

}

export const Pack = (props: PackType) => {
    const [isDeletePackActive, setIsDeletePackActive] = useState(false)
    const [isUpdatePackActive, setIsUpdatePackActive] = useState(false)
    const [updatePackValue, setUpdatePackValue] = useState('')

    const date = parseISO(props.lastUpdate).toString().slice(0,24)



    //delete pack functions
    const onClickDeleteHandler = () => {
        props.onClickDeleteHandler(props.packId, props.userId)
        setIsDeletePackActive(false)
    }
    const showModalDelete = () => {
        setIsDeletePackActive(true)
    }
    //rename pack functions
    const showModalUpdate = () => {
        setIsUpdatePackActive(true)
    }
    const onClickUpdateHandler = (packId: string) => {
        let obj: RenamePackDataType = {
            _id: packId,
            name: updatePackValue
        }
        props.onClickUpdateHandler(obj)
        setIsUpdatePackActive(false)
        setUpdatePackValue('')
    }

    const getCardsOnClick = () => {
        props.getCardsOnClick(props.packId, 10)
    }
    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatePackValue(e.currentTarget.value)
    }


    return (
        <>
            <Modal modalActive={isDeletePackActive}
                   setModalActive={setIsDeletePackActive}
                   onClick={onClickDeleteHandler}
                   onCancel={() => setIsDeletePackActive(false)}
            >
                <p>Do you want to delete this pack?</p>
            </Modal>

            <ModalInput modalActive={isUpdatePackActive}
                        onChange={onChangeValueHandler}
                        setModalActive={setIsUpdatePackActive}
                        onClick={() => onClickUpdateHandler(props.packId)}
                        onCancel={() => setIsUpdatePackActive(false)}
                        value={updatePackValue}
            >
                <p>Do you want to rename this pack?</p>
            </ModalInput>

            <tr className={style.body}>
                <td></td>
                <td>{props.name}</td>
                <td>{props.cardsCount}</td>
                <td>{date}</td>
                <td>

                        <button onClick={showModalDelete}>
                            <img src={deleteIcon} className={style.delete}/>
                        </button>


                </td>
                <td>
                    <button onClick={showModalUpdate}>
                        <img src={edit} className={style.edit}/>
                    </button>

                </td>
                <td>
                    <NavLink onClick={getCardsOnClick}
                             className={style.card}
                             to={`cards/${props.packId}`}
                    >
                        Cards
                    </NavLink>
                </td>
            </tr>
        </>

    )
}