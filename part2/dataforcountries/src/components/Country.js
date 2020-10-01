import React from 'react'


export default ({CountryName,Countries}) => {
    if(CountryName === '') return(<p>There is no country with such name</p>)
    if (Countries.length > 10)
    return (<p>Too many matches, specify another filter</p>)
    else {
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