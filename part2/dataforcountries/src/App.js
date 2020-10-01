import React, {useEffect, useState } from 'react'
import axios from 'axios'
import Country from './components/Country'
let tmp = []
axios.get('https://restcountries.eu/rest/v2').then(response=>{tmp=response.data.map(Country=>{return({...Country,show:false})})})

export default () => {
const [Countries,setCountries] = useState([])
const [CountryName, setCountryName] = useState('')
useEffect(()=>{axios.get('https://restcountries.eu/rest/v2').then(response=>{
    setCountries(response.data.map(Country=>{return({...Country,show:false})}))
})},[])
const Filter = (value) =>{
    console.log(value)
    if(value === ''){
        setCountries(tmp)
    }
    else{
        setCountries(tmp.filter(Country => Country.name.toLowerCase().indexOf(value.toLowerCase()) !== -1))
    }
}
return(
    <div>
    <h1>Insert country name</h1>
    <input 
    value={CountryName}
    onChange={(event)=>{setCountryName(event.target.value); Filter(event.target.value)}}
    >
    </input>
    <Country CountryName={CountryName} Countries={Countries} setCountries={setCountries}/>
    </div>
)
}