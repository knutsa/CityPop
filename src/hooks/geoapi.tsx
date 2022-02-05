import React from 'react'
import {City, ErrorData} from 'interfaces'
import {getIsoCode} from './iso-code-converter'

const API_KEY = "QluQIOIwGurptxPwEAleUA==erg7WCxB8ernkziQ"

//Comparison to order Cities
const CityComparer = (a: City, b: City)=>{
    if(a.population>b.population)
        return -1;
    if(a.population<b.population)
        return 1;
    return 0;
}

export const useGEOFetch = () => {
    //Base hook used in nameSearch nad landSearch - gives filtered and sorted list of cities
    const [rawData, setRawData] = React.useState<City[] | null>(null);
    const [data, setData] = React.useState<City[] | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<ErrorData | null>(null);

    React.useEffect(()=>{
        //console.log("rawData state", rawData);
        const newData = rawData
            ?.sort(CityComparer)
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
            const res = await fetch(url, {headers: {'X-Api-Key': API_KEY}});
            const parsedData: City[] = await res.json();
            //console.log("Parsed data", parsedData);
            if(!res.ok)
                throw new Error()
            setRawData(parsedData);
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
    Hook to search for city by name
    returns foremost state values foundCity, isLoading, Error and searchByName method to trigger search - {foundCity, isLoading, Error, searchByName}
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
        return geoApi.fetchRes(`https://api.api-ninjas.com/v1/city?name=${cityName}&limit=10`);
    }
   return {...geoApi, searchByName, foundCity}
   
}

export const useLandSearch = ()=>{
    /*
    Hook to search for cities by country
    returns state values data, isLoading, Error and searchByLand - {data, isLoading, Error, searchByLand}
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
       return geoApi.fetchRes(`https://api.api-ninjas.com/v1/city?country=${isoCode}&limit=30`)
   }
   return {...geoApi, searchByLand}
}

