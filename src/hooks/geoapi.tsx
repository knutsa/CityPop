import React from 'react'

import {City} from '../interfaces'

const fetchGeoNames = async (cityName: string) =>{
    const res = await fetch(`http://api.geonames.org/searchJSON?q=${cityName}&maxRows=100&username=weknowit`);
    const data = await res.json()
    return data.geonames;
}

interface Error {
    msg: string;
}

export const useGEOFetch = (searchMethod: ("name" | "land")) => {
    const [data, setData] = React.useState<City[] | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<Error | null>(null);

    const fetchRes = async (url: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(url);
            const parsedData: {geonames: City[]} = await res.json();
            setData(parsedData.geonames);
        } catch {
            setError({msg: "Something went wrong when fetching the data."});
            return false;
        }
        return true;
    }
    const searchByName = async (cityName: string) => {
        return fetchRes(`http://api.geonames.org/searchJSON?q=${cityName}&maxRows=100&username=weknowit`)
    }

    const targetUrl = searchMethod === "name" ? 
        `http://api.geonames.org/searchJSON?q=${cityName}&maxRows=100&username=weknowit` :
        `http://api.geonames.org/searchJSON?q=${cityName}&maxRows=100&username=weknowit`
    
    return {
        data,
        isLoading,
        error,
        search: searchMethod === "land" ? searchByName : null
    }
}

export const useNameSearch = ()=>{
    /*
        Hook to search for city data
        returns state values data, isLoading, Error and method to trigger new serach - {data, isLoading, Error, reSearch}
    */
}
export const useLandSearch = ()=>{
    /*
        Hook to search for city data
        returns state values data, isLoading, Error and method to trigger new serach - {data, isLoading, Error, reSearch}
    */
}