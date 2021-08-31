import React from 'react'

import {City} from '../../interfaces'

import styles from './style.module.css';

export const CityLI: React.FC<{city: City, onClick: React.MouseEventHandler<HTMLDivElement>}> = ({city: City, onClick})=>{
    //Displays city in list
    return <div onClick={onClick} className={`${styles.box} ${styles.city_li} m-1`}>
        <p className="f-sm text-center">{City.name}</p>
    </div>
}

export const CityInfo: React.FC<{city: City, containerClassNames?: string}> = ({city, containerClassNames})=>{
    //Displays when showing population of city - covers entire screen
    return <article className={`d-flex flex-column align-items-center ${styles.city_info} ${containerClassNames}`}>
        <p className="f-md mb-3">{city.name}</p>
        <div className={`${styles.box}`}>
            <p className="f-sm">Population</p>
            <p className="f-lg">{city.population}</p>
        </div>
    </article>
}
