import React from 'react'
import CountryDetails from './Countrydetails'



export default ({CountryName,Countries}) => {
    if(CountryName === '' || Countries.length === 0)
    { 
        return(<p>There is no country with such name</p>)
    }
    else if (Countries.length > 10){
    return (<p>Too many matches, specify another filter</p>)
    }
    else if(Countries.length === 1){
        return(
        <CountryDetails name={Countries[0].name} flag={Countries[0].flag} capital={Countries[0].capital} languages={Countries[0].languages} population={Countries[0].population}/> 
        )
    }
    else{
        return(
            <div>
            <ul>
            {Countries.map((Country,i) =>{
                return(<li key={i}>{Country.name}</li>)
            })}
            </ul>
            </div>
        )
    }
}