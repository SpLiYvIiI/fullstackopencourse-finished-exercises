import React from 'react'

export default ({persons,deleteNumber}) => persons.map(person => 
<p>{person.name} {person.number} <button onClick={()=>{deleteNumber(person.id)}}>delete</button> </p>
)