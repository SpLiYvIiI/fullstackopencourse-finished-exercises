import React from 'react'


export default ({Filter,setPerson,Person}) => {
    return(
        <input 
        value={Person}
        onChange={(event)=>{setPerson(event.target.value); Filter(event.target.value)}}
        >   
        </input>
    )
}