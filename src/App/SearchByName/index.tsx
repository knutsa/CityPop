import React from 'react'

import {useNameSearch} from 'hooks/geoapi'

function SearchBarLand() {
    //display search bar, use state to update to list -> one city
    const [inp, setInp] = React.useState("");
    const {
        data,
        isLoading,
        error,
        searchByName
    } = useNameSearch()
    return (
        <div>
            <h2 className="f-md mt-3">Search by City</h2>
            <input className="f-sm" type="text" name="" id="" onChange={(e)=>{e.preventDefault(); setInp(e.target.value)}}/><br/>
            <button className="btn" onClick={e=>{e.preventDefault(); searchByName(inp)}}>Search</button>
            <ul>
                {
                    data && data.map(city=>{
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

export default SearchBarLand
