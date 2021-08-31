import React from 'react'

import {useLandSearch} from 'hooks/geoapi'
import SearchBar from '../SearchBar'
import {CityLI, CityInfo} from '../CityDisplay'
import {getCountry} from 'hooks/iso-code-converter'

function SearchByLand() {
    //display search bar, use state to update to list -> one city
    const geoAPI = useLandSearch();
    const [selected, setSelected] = React.useState<number | undefined>();
    return (
        <section>
            {geoAPI.data === null && <><h2 className="f-md">Search By Land</h2> <SearchBar search={(txt)=>{setSelected(undefined); return geoAPI.searchByLand(txt);}} containerClasses="mt-5"></SearchBar> </>}
                {
                    geoAPI.data && selected !== undefined && <CityInfo city={geoAPI.data[selected]} containerClassNames="mt-3"></CityInfo>
                }
                {
                    selected === undefined && geoAPI.data && ( <div>
                        <p className="f-md my-3">{geoAPI.data[0].countryName}</p>
                        {
                            geoAPI.data.map((city, ind)=>{
                                if(ind>=10)
                                    return null;
                                return (
                                   <CityLI key={ind} city={city} onClick={(e)=>setSelected(ind)}></CityLI> 
                            )})
                        }
                    </div>)
                }

        </section>
    )
}

export default SearchByLand
