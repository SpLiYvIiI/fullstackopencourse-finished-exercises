import React, { useState } from 'react'
import Persons from './components/Persons.js'
import NewPerson from './components/NewPerson.js'

const App = (props) => {
  const [ persons, setPersons ] = useState(props.numbers) 
  const [ newName, setNewName ] = useState('')
  const AddNumber = (event) =>{
    event.preventDefault();
    const Numberobj = {
      name : newName
    }
    setPersons(persons.concat(Numberobj))
    setNewName('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <NewPerson AddNumber={AddNumber} newName={newName} setNewName={setNewName}/>
      <h2>Numbers</h2>
      <Persons persons={persons} />

    </div>
  )
}

export default App