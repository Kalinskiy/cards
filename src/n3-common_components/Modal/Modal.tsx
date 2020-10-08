import React from "react";
import  './Modal.css'
import {addPackTC} from "../../n1-main/Table/Table-Reducer/TableReducer";
import {useDispatch} from "react-redux";

type PropsType = {
    modalActive: boolean
    setModalActive: (active: boolean) => void
    children:any
    onCancel:any
    onClick:any
}

const Modal = (props: PropsType) => {
const dispatch = useDispatch()


    return <div className={props.modalActive ? 'modal active' : 'modal'} onClick={props.onClick}>
        <div className={props.modalActive ? 'modalContent active' : 'modalContent'} onClick={e => e.stopPropagation()}>
            {props.children}
            <button onClick={props.onClick}>Submit</button>
            <button onClick={props.onCancel}>Cancel</button>

        </div>

    </div>

}
export default Modal