import React from 'react'

export default ({City,Temperature,Image,Wind,WindDirection})=>{
    return(
    <div>
    <h1>Weather in {City}</h1>
    <p>Temperature : {Temperature} Celsius</p>
    <img alt='Weather-Pic' src={Image}></img>
    <p>Wind : {Wind} mph direction {WindDirection}</p>
    </div>
    )
}