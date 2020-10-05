import React from "react";
import s from './Search.module.css'
import {PackType} from "../../Table-API/API-Table";


type PropsType = {
    packs: Array<PackType>
    value:string
    setInputValue:(value:string)=>void
    onChangeSearch:(e: React.ChangeEvent<HTMLInputElement>)=>void

}
const Search = (props: PropsType) => {





    return <div className={s.search}>
        <input type="text"

               value={props.value} onChange={props.onChangeSearch} placeholder={'Search...'}/>
    </div>
}

export default Search