import React from 'react'

const fetchGeoNames = async (cityName: string) =>{
    const res = await fetch(`http://api.geonames.org/searchJSON?q=${cityName}&maxRows=100&username=weknowit`);
    const data = await res.json()
    return data.geonames;
}

export const useNameSearch = ()=>{
    /*
        Hook to search for city data
        returns state values data, isLoading and method to trigger new serach - {data, isLoading, reSearch}
    */
}
export const useLandSearch = ()=>{
    /*
        Hook to search for city data
        returns state values data, isLoading and method to trigger new serach - {data, isLoading, reSearch}
    */
}