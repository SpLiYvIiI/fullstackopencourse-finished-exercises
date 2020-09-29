import React from 'react'

export default ({persons}) => persons.map(person => <p>{person.name}</p>)