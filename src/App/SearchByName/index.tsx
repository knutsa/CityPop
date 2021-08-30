import React from 'react'

import {useNameSearch} from 'hooks/geoapi'
import SearchBar from '../SearchBar'

function SearchBarLand() {
    //display search bar, use state to update to list -> one city
    const geoAPI = useNameSearch();
    return (
        <section>
            <h2 className="f-md mt-3">Search by City</h2>
            <SearchBar search={geoAPI.searchByName} containerClasses="mt-5"></SearchBar>
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
        </section>
    )
}

export default SearchBarLand
