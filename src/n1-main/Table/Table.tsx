import React, {useEffect} from "react";
import style from "./Table.module.scss"
import {Pack} from "./Pack/Pack";
import {useDispatch, useSelector} from "react-redux";
import {getPacksTC} from "./Reducer/TableReducer";
import {AppStateType} from "../m2-bll/store";
import {PackType} from "./API/API-Table";
import {AddPackForm} from "./Add-Pack/Add-pack";

export const Table = () => {

    const dispatch = useDispatch()

    const packs = useSelector<AppStateType, PackType[]>(state => state.table.packs)

    useEffect(() => {dispatch(getPacksTC())}, [])

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
                   packs.map(e => <Pack key={e._id} name={e.name} cardsCount={e.cardsCount} lastUpdate={e.updated}/>)
               }
           </table>
           <AddPackForm/>
       </div>
    )
}