import React, { useState , useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons.js'
import NewPerson from './components/NewPerson.js'
import FindPerson from './components/FindPerson.js'
import PersonService from './services/PersonService'
const App = () => {
  const[Initial,setInitial] = useState([])
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [Person , setPerson] = useState('')
  useEffect(() => {
    PersonService.getAll().then(InitialData => {
    setInitial(InitialData)
    setPersons(InitialData)
  })}, [])
  const AddNumber = (event) =>{
    event.preventDefault();
    if(persons.find(person=>person.name.toLowerCase() === newName.toLowerCase()) === undefined){
      const Numberobj = {
        name : newName,
        number : newNumber
      }
      PersonService.addNumber(Numberobj).then(NewPer => {
      setPersons(persons.concat(NewPer))
      setInitial(Initial.concat(NewPer))
    })
    }
    else {
      if(window.confirm(`${newName} is already in database do you want to update a number ?`)){
        const perObj = persons.find(person=>person.name.toLowerCase() === newName.toLowerCase())
        const newObj = {...perObj,number:newNumber}
        PersonService.updateNumber(perObj.id,newObj).then(newOb =>{
          setInitial(Initial.map(person => person.id !== perObj.id ? person : newOb))
          setPersons(persons.map(person => person.id !== perObj.id ? person : newOb))
        })
      }
    }
    setNewName('')
    setNumber('')
  }
  const Filter = (value) =>{
    if(value === ''){
      setPersons(Initial);
    }
    else {
      setPersons(Initial.filter(person => person.name.toLowerCase().indexOf(value.toLowerCase()) !== -1))
    }
  }
  const deleteNumber = (id) =>{
    if(window.confirm('You really want to delete this phone number ?! ')){
    PersonService.deleteNumber(id).then(Res => console.log(Res))
    setInitial(Initial.filter(per => per.id !== id))
    setPersons(persons.filter(per=> per.id !== id))
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <FindPerson Filter={Filter} setPerson={setPerson} Person={Person}/>
      <h1>Add number</h1>
      <NewPerson AddNumber={AddNumber} newName={newName} setNewName={setNewName} newNumber={newNumber} setNumber={setNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} deleteNumber={deleteNumber}/>
    </div>
  )
}

export default App