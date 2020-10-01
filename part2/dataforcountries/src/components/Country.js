import React from 'react'
import CountryDetails from './Countrydetails'



export default ({CountryName,Countries,setCountries}) => {
    if(CountryName === '' || Countries.length === 0)
    { 
        return(<p>There is no country with such name</p>)
    }
    else if (Countries.length > 10){
    return (<p>Too many matches, specify another filter</p>)
    }
    else{
        if(Countries.length === 1){
            return(
            <CountryDetails show={true} name={Countries[0].name} flag={Countries[0].flag} capital={Countries[0].capital} languages={Countries[0].languages} population={Countries[0].population}/> 
            )
        }
        else{
        return(
            <div>
            <ul>
            {Countries.map((Country,i) =>{
                return(
                <li key={i}>
                {Country.name} 
                <button onClick={()=>{let tmp = [...Countries]; tmp[i].show = !tmp[i].show; setCountries(tmp)}}>{Country.show ? 'hide':'show'}</button>
                <CountryDetails show={Country.show} name={Country.name} flag={Country.flag} capital={Country.capital} languages={Country.languages} population={Country.population}/>
                </li>) 
            })}
            </ul>
            </div>
        )
        }
    }
}