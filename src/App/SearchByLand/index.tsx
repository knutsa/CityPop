import React from 'react'

import {useLandSearch} from 'hooks/geoapi'
import SearchBar from '../SearchBar'
import {CityLI, CityInfo} from '../CityDisplay'

function SearchByLand() {
    //display search bar, use state to update to list -> one city
    const geoAPI = useLandSearch();
    const [selected, setSelected] = React.useState<number | undefined>();
    return (
        <section>
            <h2 className="f-md">Search By Land</h2>
            <SearchBar search={geoAPI.searchByLand}></SearchBar>
                {
                    geoAPI.data && selected && <CityInfo city={geoAPI.data[selected]}></CityInfo>
                }
                {
                    !selected && geoAPI.data && ( <div>{geoAPI.data.map(city=>{
                        return (
                           <CityLI city={city}></CityLI> 
                        )
                    })}</div>)
                }

        </section>
    )
}

export default SearchByLand
