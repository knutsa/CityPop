import React from 'react'

import {useNameSearch} from 'hooks/geoapi'
import {SearchBar, Loading, ErrorMsg} from '../ReusableComponents'
import {CityInfo} from '../ReusableComponents/CityDisplay'

function SearchByName() {
    //display search bar, use state to update to list -> one city
    const geoAPI = useNameSearch();
    return (
        <section>
            {
                geoAPI.foundCity === null && <>
                    <h2 className="f-md mt-3">Search by City</h2>
                    <SearchBar search={geoAPI.searchByName} containerClasses="mt-5"></SearchBar>
                </>
            }
            {
                geoAPI.foundCity && <CityInfo city={geoAPI.foundCity} containerClassNames="mt-3"></CityInfo>
            }
            {
                geoAPI.isLoading && <Loading></Loading>
            }
            {
                geoAPI.error !== null && geoAPI.foundCity === null && <ErrorMsg error={geoAPI.error}></ErrorMsg>
            }
        </section>
    )
}

export default SearchByName
