import React, {useEffect} from "react";
import style from "./Table.module.scss"
import {Pack} from "./Pack/Pack";
import {useDispatch, useSelector} from "react-redux";
import {deletePackTC, getPacksTC} from "./Reducer/TableReducer";
import {AppStateType} from "../m2-bll/store";
import {PackType} from "./API/API-Table";
import {AddPackForm} from "./Add-Pack/Add-pack";
import {RenameWindow} from "../../n3-common_components/Rename-window/Rename-window";
import {changeTrigger, savePackId} from "../../n3-common_components/Rename-window/Reducer/Rename-Reducer";
import {Preloader} from "../../n3-common_components/Preloader/Preloader";

export const Table = () => {

    const dispatch = useDispatch()

    const packs = useSelector<AppStateType, PackType[]>(state => state.table.packs)
    const triggerRename = useSelector<AppStateType, boolean>(state => state.rename.trigger)
    const triggerPreloader = useSelector<AppStateType, boolean>(state => state.preloader.trigger)
    const userId = useSelector<AppStateType, string | null>(state => state.login.auth._id)

   useEffect(() => {
       userId && dispatch(getPacksTC(userId))
   }, [userId])

    const onClickDeleteHandler = (packId: string | null, userId: string | null) => {
        dispatch(deletePackTC(packId, userId))
    }

    const onClickUpdateHandler = (packId: string | null) => {
        dispatch(savePackId(packId))
        dispatch(changeTrigger(true))
    }

    return (
       <div className={style.container}>
           <table>
               <thead className={style.header}>
                   <tr>
                       <th>Name</th>
                       <th>Cards Count</th>
                       <th>Last update</th>
                   </tr>
               </thead>
               {
                   packs.map(e => <Pack key={e._id}
                                        packId={e._id}
                                        name={e.name}
                                        cardsCount={e.cardsCount}
                                        lastUpdate={e.updated}
                                        userId={userId}
                                        onClickDeleteHandler={onClickDeleteHandler}
                                        onClickUpdateHandler={onClickUpdateHandler}
                   />)
               }
           </table>
           <AddPackForm/>
           {triggerRename && <RenameWindow/>}
           {triggerPreloader && <Preloader/>}


       </div>
    )
}