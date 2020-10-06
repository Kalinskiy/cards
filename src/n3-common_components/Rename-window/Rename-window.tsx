import React from "react";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {changePackNameTC} from "../../n1-main/Table/Table-Reducer/TableReducer";
import {AppStateType} from "../../n1-main/m2-bll/store";
import style from './Rename.module.scss'

export const RenameWindow = () => {

    const dispatch = useDispatch()
    const packId = useSelector<AppStateType, string | null>(state => state.rename.packId)
    const userId = useSelector<AppStateType, string | null>(state => state.login.auth._id)


    const formik = useFormik({
        validate: (values) => {},
        initialValues: {
            name: '',
        },
        onSubmit: values => {

            let data = {
                _id: packId,
                name: values.name
            }
           dispatch(changePackNameTC(data, userId))
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} >
            <div className={style.rename}>
                <label  htmlFor={"name"}><span>Rename Card</span></label>
            <br/>
            <input
                type="text"
                {...formik.getFieldProps("name")}
            />
            <button type="submit">Submit</button>
            </div>
        </form>
    )
}