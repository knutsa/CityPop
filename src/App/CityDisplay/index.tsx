import React from 'react'

import {City} from '../../interfaces'

export const CityLI: React.FC<{city: City}> = ({city: City})=>{
    //Displays city in list
    return <div>
        <p className="f-sm text-center">{City.name}</p>
    </div>
}

export const CityInfo: React.FC<{city: City}> = ({city: City})=>{
    //Displays when showing population of city - covers entire screen
    return <article className={``}>
        <p className="f1-sm">{City.name}</p>
        <p className="f-md">{City.population}</p>
    </article>
}
