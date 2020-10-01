import React from 'react'

export default({show,name,flag,capital,languages,population})=>{
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
        </div>
    )
    }
    else return(<></>)
}