import React, { useState } from 'react'
import Persons from './components/Persons.js'
import NewPerson from './components/NewPerson.js'
import FindPerson from './components/FindPerson.js'

const App = (props) => {
  let tmp = props.numbers;
  const [ persons, setPersons ] = useState(props.numbers) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [Person , setPerson] = useState('')
  const AddNumber = (event) =>{
    event.preventDefault();
    const Numberobj = {
      name : newName,
      number : newNumber
    }
    console.log(newName)
    if(persons.find(person=>person.name.toLowerCase() === newName.toLowerCase()) === undefined){
    setPersons(persons.concat(Numberobj))
    tmp.push(Numberobj)
    }
    else {
      alert(newName + 'is already in phonebook')
    }
    setNewName('')
    setNumber('')
  }
  const Filter = (value) =>{
    if(value === ''){
      setPersons(tmp);
    }
    else {
      setPersons(tmp.filter(person => person.name.toLowerCase().indexOf(Person.toLowerCase()) !== -1))
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <FindPerson Filter={Filter} setPerson={setPerson} Person={Person}/>
      <h1>Add number</h1>
      <NewPerson AddNumber={AddNumber} newName={newName} setNewName={setNewName} newNumber={newNumber} setNumber={setNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App