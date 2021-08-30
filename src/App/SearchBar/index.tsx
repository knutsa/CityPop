import React, { MouseEvent } from 'react'

import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'

import styles from './style.module.css'

const Search: React.FC<{search:(txt: string)=>Promise<boolean>, containerClasses?: string }> = ({search, containerClasses})=>{
    const [inp, setInp] = React.useState("");
    const handleChange = (e: any)=>{
        e.preventDefault();
        setInp(e.target.value)
    }
    return (
        <div className={`${styles.search_container} d-flex flex-column align-items-center ${containerClasses}`}>
            <TextField
                value={inp}
                onChange={handleChange}
                size="small"
                variant="filled"
            />
            {/* <input className="f-sm" type="text" name="" id="" onChange={(e)=>{e.preventDefault(); setInp(e.target.value)}}/> */}
            <button className="btn f-md mt-2" onClick={e=>{e.preventDefault(); search(inp);}}>
                <SearchIcon fontSize="large"></SearchIcon>
            </button>
        </div>
    )
}

export default Search