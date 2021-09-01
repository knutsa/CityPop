import React from 'react'

import {useNameSearch} from 'hooks/geoapi'
import {SearchBar, Loading, ErrorMsg} from '../ReusableComponents'
import {CityInfo} from '../ReusableComponents/CityDisplay'

function SearchBarLand() {
    //display search bar, use state to update to list -> one city
    const geoAPI = useNameSearch();
    return (
        <section>
            {
                geoAPI.data === null && <>
                    <h2 className="f-md mt-3">Search by City</h2>
                    <SearchBar search={geoAPI.searchByName} containerClasses="mt-5"></SearchBar>
                </>
            }
            {
                geoAPI.data && <CityInfo city={geoAPI.data[0]} containerClassNames="mt-3"></CityInfo>
            }
            {
                geoAPI.isLoading && <Loading></Loading>
            }
            {
                geoAPI.error !== null && geoAPI.data === null && <ErrorMsg error={geoAPI.error}></ErrorMsg>
            }
        </section>
    )
}

export default SearchBarLand
