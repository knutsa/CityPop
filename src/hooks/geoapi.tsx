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
        setData,
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
    const geoApi = useGEOFetch();
    const [city, setCity] = React.useState<City | null>(null);
    React.useEffect(()=>{
        if(geoApi.data === null){
            setCity(null);
        } else{
            setCity(geoApi.data[0]);
        }
    }, [geoApi.data])
    const searchByName = async (cityName: string) => {
    //   Promise resolves to true if data was fetched
        return geoApi.fetchRes(`http://api.geonames.org/searchJSON?q=${cityName}&maxRows=100&username=weknowit`);
    }
   return {...geoApi, searchByName}
   
}

//Comparison to order Cities
const CityComparer = (a: City, b: City)=>{
    if(a.population>b.population)
        return -1;
    if(a.population<b.population)
        return 1;
    return 0;
}

export const useLandSearch = ()=>{
    /*
    Hook to search for city data
    returns state values data, isLoading, Error and method to trigger new serach - {data, isLoading, Error, reSearch}
    */
    const geoApi = useGEOFetch();
    React.useEffect(()=>{
        geoApi.setData(prev=>{
            if(prev === null)
                return null;
            prev.sort(CityComparer);
            const newData = [];
            for(let i = 0;i<10&&i<prev.length;i++){
                newData.push(prev[i])
            }
            return newData;
        });
    }, [geoApi.data])
    const searchByLand = async (country: string) => {
    //    Promise resolves to true if data was fetched
       const isoCode = getIsoCode(country);
       if(isoCode === undefined){
           geoApi.setError({msg: "This is not a country."});
           geoApi.setData(null);
           return false;
       }
       return geoApi.fetchRes(`http://api.geonames.org/searchJSON?country=${isoCode}&maxRows=100&username=weknowit`)
   }
   return {...geoApi, searchByLand}
}