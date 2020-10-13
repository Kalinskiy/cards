import React, {ChangeEvent, useState} from "react";
import style from './Modal.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../n1-main/m2-bll/store";
import {addPackTC} from "../../n1-main/Table/Table-Reducer/TableReducer";

type ModalAddPackType = {
    modalActive: boolean
    setModalActive: (active: boolean) => void
    children: any
    onCancel: any
    onClick: any
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    withoutInput?: boolean
}

type ModalCardType = {
    modalActive: boolean
    setModalActive: (active: boolean) => void
    children: any
    onCancel: any
    onClick: any

}
type ModalWithChildrenType = {
    modalActive: boolean
    setModalActive: (active: boolean) => void
    children: any



}

export const ModalInput = (props: ModalAddPackType) => {

    return <div className={props.modalActive ? `${style.modal} ${style.active}` : style.modal} onClick={props.onClick}>
        <div className={props.modalActive ? `${style.modalContent} ${style.active} ` : style.modalContent}
             onClick={e => e.stopPropagation()}>
            {props.children}
            <input
                value={props.value}
                onChange={props.onChange}
                type="text"
            />
            <br/>
            <button onClick={props.onClick}>Submit</button>
            <button onClick={props.onCancel}>Cancel</button>


        </div>

    </div>

}
export const Modal = (props: ModalCardType) => {

    return <div className={props.modalActive ? `${style.modal} ${style.active}` : style.modal} onClick={props.onClick}>
        <div className={props.modalActive ? `${style.modalContent} ${style.active} ` : style.modalContent}
             onClick={e => e.stopPropagation()}>
            {props.children}
            <br/>
            <button onClick={props.onClick}>Submit</button>
            <button onClick={props.onCancel}>Cancel</button>
        </div>

    </div>
}
export const ModalWithChildren = (props: ModalWithChildrenType) => {

    return <div className={props.modalActive ? `${style.modal} ${style.active}` : style.modal}>
        <div className={props.modalActive ? `${style.modalContent} ${style.active} ` : style.modalContent}
             onClick={e => e.stopPropagation()}>
            {props.children}

        </div>

    </div>
}
