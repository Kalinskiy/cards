import React, {useEffect} from "react";
import style from "./Table.module.scss"
import {Pack} from "./Pack/Pack";
import {useDispatch, useSelector} from "react-redux";
import {deletePackTC, getPacksTC} from "./Reducer/TableReducer";
import {AppStateType} from "../m2-bll/store";
import {PackType} from "./API/API-Table";
import {AddPackForm} from "./Add-Pack/Add-pack";

export const Table = () => {

    const dispatch = useDispatch()

    const packs = useSelector<AppStateType, PackType[]>(state => state.table.packs)
    const userId = useSelector<AppStateType, string | null>(state => state.login.auth._id)

   useEffect(() => {
       userId && dispatch(getPacksTC(userId))
   }, [userId])

    const deleteHandler = (packId: string | null, userId: string | null) => {
        dispatch(deletePackTC(packId, userId))
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
                                        onClick={deleteHandler}
                   />)
               }
           </table>
           <AddPackForm/>
       </div>
    )
}