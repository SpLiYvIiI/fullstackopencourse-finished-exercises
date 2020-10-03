import React from 'react'

export default ({persons,deleteNumber}) => persons.map((person,i) => 
<p key={i} className='person'>{person.name} {person.number} <button onClick={()=>{deleteNumber(person.id)}}>delete</button> </p>
)