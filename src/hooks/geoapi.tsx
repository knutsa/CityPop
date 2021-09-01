import React from 'react'
import {City, Error} from 'interfaces'
import {getIsoCode} from './iso-code-converter'

//Comparison to order Cities
const CityComparer = (a: City, b: City)=>{
    if(a.population>b.population)
        return -1;
    if(a.population<b.population)
        return 1;
    return 0;
}

export const useGEOFetch = () => {
    const [rawData, setRawData] = React.useState<City[] | null>(null);
    const [data, setData] = React.useState<City[] | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    React.useEffect(()=>{
        const newData = rawData?.filter(place=>place.fcl === "P")
            .sort(CityComparer)
            .slice(0, 10);
        if(newData?.length)
            setData(newData);
        else
            setData(null);
    }, [rawData]);

    const fetchRes = async (url: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(url);
            const parsedData: {geonames: City[]} = await res.json();
            setRawData(parsedData.geonames);
            setIsLoading(false);
        } catch {
            setError({msg: "Something went wrong when fetching the data."});
            setIsLoading(false);
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
    const [nameToMatch, setNameToMatch] = React.useState<string | null>(null);
    const [foundCity, setFoundCity] = React.useState<City | null>(null);
    const geoApi = useGEOFetch();
    React.useEffect(()=>{
        const newData = geoApi.data?.filter(city=>city.name.toUpperCase()===nameToMatch?.toUpperCase());
        if(newData?.length){
            setFoundCity(newData[0]);
            return;
        }
        if(nameToMatch !== null && !geoApi.isLoading)
            geoApi.setError({msg: `No city named "${nameToMatch}"`})
        setFoundCity(null);
        return;
    }, [geoApi.data, geoApi.isLoading, nameToMatch])
    const searchByName = async (cityName: string) => {
    //   Promise resolves to true if data was fetched
        setNameToMatch(cityName);
        return geoApi.fetchRes(`https://secure.geonames.org/searchJSON?q=${encodeURIComponent(cityName)}&featureClass=P&maxRows=100&username=weknowit`);
    }
   return {...geoApi, searchByName, foundCity}
   
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
       if(isoCode === undefined){
           geoApi.setError({msg: "This is not a country."});
           geoApi.setData(null);
           return false;
       }
       return geoApi.fetchRes(`https://secure.geonames.org/searchJSON?country=${isoCode}&featureClass=P&maxRows=100&username=weknowit`)
   }
   return {...geoApi, searchByLand}
}

