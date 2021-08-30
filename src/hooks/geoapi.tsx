import React from 'react'
import {City} from 'interfaces'
import {getIsoCode, getCountry} from './iso-code-converter'

interface Error {
    msg: string;
}

export const useGEOFetch = () => {
    const [data, setData] = React.useState<City[] | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    const fetchRes = async (url: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(url);
            const parsedData: {geonames: City[]} = await res.json();
            setData(parsedData.geonames);
            setIsLoading(false);
        } catch {
            setError({msg: "Something went wrong when fetching the data."});
            return false;
        }
        return true;
    }
    
    return {
        data,
        isLoading,
        error,
        setError,
        fetchRes
    }
}

export const useNameSearch = ()=>{
    /*
    Hook to search for city data
    returns state values data, isLoading, Error and method to trigger new serach - {data, isLoading, Error, reSearch}
    */
   const geoApi = useGEOFetch()
   const searchByName = async (cityName: string) => {
    //   Promise resolves to true if data was fetched
       return geoApi.fetchRes(`http://api.geonames.org/searchJSON?q=${cityName}&maxRows=100&username=weknowit`)
   }
   return {...geoApi, searchByName}
   
}
export const useLandSearch = ()=>{
    /*
    Hook to search for city data
    returns state values data, isLoading, Error and method to trigger new serach - {data, isLoading, Error, reSearch}
    */
   const geoApi = useGEOFetch();
   const searchByLand = async (country: string) => {
    //    Promise resolves to true if data was fetched
       const isoCode = getIsoCode(country);
       if(isoCode === null){
           geoApi.setError({msg: "This is not a country."});
           return false;
       }
       return geoApi.fetchRes(`http://api.geonames.org/searchJSON?country=${isoCode}&maxRows=100&username=weknowit`)
   }
   return {...geoApi, searchByLand}
}