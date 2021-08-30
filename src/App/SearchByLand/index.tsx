import React from 'react'

import {useLandSearch} from 'hooks/geoapi'
import SearchBar from '../SearchBar'

function SearchByLand() {
    //display search bar, use state to update to list -> one city
    const geoAPI = useLandSearch();
    return (
        <div>
            <h2 className="f-md">Search By Land</h2>
            <SearchBar search={geoAPI.searchByLand}></SearchBar>
            <ul>
                {
                    geoAPI.data && geoAPI.data.map(city=>{
                        return (
                            <li>
                                <p>{city.name}</p>
                                <p>{city.population}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default SearchByLand
