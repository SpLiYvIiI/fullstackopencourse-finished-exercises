import React, { useEffect, useState } from 'react'
import Weather from './Weather'
import axios from 'axios'

export default({show,name,flag,capital,languages,population})=>{
    const [wzr,setWeather] = useState({});
    const [x,setX] = useState(false) 
    useEffect(()=>{
        axios.get('http://api.weatherstack.com/current?access_key=41688ecfa0b76a65a0569c3212a65445&query='+capital).then(response=>{
            console.log(capital)
            setWeather(response.data);
            setX(true)
        })
    }
    ,[])
    if(show){
    return(
        <div>
        <h1>{name}</h1>
        <p>capital {capital}</p>
        <p>population {population}</p>
        <h1>Languages</h1>
        <ul>
        {languages.map((language,i)=>{
            return(<li key={i}>{language.name}</li>)
        })}
        </ul>
        <img alt='flag' style={{height:"120px", width:"180px"}} src={flag}></img>
        {x === true ? <Weather City={name} Temperature={wzr.current.temperature} Image={wzr.current.weather_icons} Wind={wzr.current.wind_speed} WindDirection={wzr.current.wind_dir}/>: <></>}
        </div>
    )
    }
    else return(<></>)
}