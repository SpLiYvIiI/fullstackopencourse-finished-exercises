import React from 'react'


export default ({id,name,parts}) => {
    return(
        <li key={id}>
        <h1>{name}</h1>
        <ul>
        {parts.map(part=>
        {
          return(<li key ={part.id}>
          {part.name} {part.exercises}
          </li>)
        }   
        )}
        <li style={{fontWeight: "bold"}}>Total of exercises {parts.reduce( ( sum, parts ) => sum + parts.exercises, 0)}</li>
        </ul>
        </li>)
}