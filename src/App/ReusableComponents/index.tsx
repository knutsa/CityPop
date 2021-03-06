import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import SearchIcon from '@material-ui/icons/Search'
import BackIcon from '@material-ui/icons/Reply'
import {ErrorData} from 'interfaces'

import styles from './style.module.css'

export const SearchBar: React.FC<{search:(txt: string)=>Promise<boolean>, containerClasses?: string }> = ({search, containerClasses})=>{
    const [inp, setInp] = React.useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        setInp(e.target.value)
    }
    const detectEnter = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === "Enter"){
            e.preventDefault();
            search(inp);
        }
    }
    return (
        <div className={`${styles.search_container} d-flex flex-column align-items-center ${containerClasses}`}>
            {/* <TextField
                value={inp}
                onChange={handleChange}
                size="small"
                variant="filled"
            /> */}
            <input className="f-sm" type="text" name="" id="" onKeyDown={detectEnter} onChange={handleChange}/>
            <button className="btn f-md mt-2" onClick={e=>{e.preventDefault(); search(inp);}}>
                <SearchIcon fontSize="large"></SearchIcon>
            </button>
        </div>
    )
}

export const ErrorMsg: React.FC<{error: ErrorData}> = ({error})=>{
    return (<div className={`${styles.error_container}`}>
        <p className="f-md">{error.msg}</p>
    </div>)
}

export const Loading: React.FC = ()=>{
    return <div className={`${styles.loading_container} d-flex flex-column align-items-center`}>
        <p className="f-sm">Loading</p>
        <CircularProgress color="inherit"></CircularProgress>
    </div>
}

export const BackBtn: React.FC<{onClick: React.MouseEventHandler<HTMLButtonElement>}> = ({onClick})=>{
    return <button onClick={onClick} className={`${styles.back_btn} f-md px-3`}><BackIcon color="inherit"></BackIcon></button>
}