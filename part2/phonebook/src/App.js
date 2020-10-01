import React, { useState , useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons.js'
import NewPerson from './components/NewPerson.js'
import FindPerson from './components/FindPerson.js'
let tmp = []
axios.get('http://localhost:3001/persons').then(response=>{ tmp = response.data})
const App = () => {
  useEffect(() => {axios.get('http://localhost:3001/persons').then(response => {setPersons(response.data)})}, [])
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [Person , setPerson] = useState('')

  const AddNumber = (event) =>{
    event.preventDefault();
    const Numberobj = {
      name : newName,
      number : newNumber
    }
    if(persons.find(person=>person.name.toLowerCase() === newName.toLowerCase()) === undefined){
    axios.post('http://localhost:3001/persons',Numberobj).then(response => {console.log(response)})
    setPersons(persons.concat(Numberobj))
    tmp.push(Numberobj)
    }
    else {
      alert(newName + ' is already in phonebook')
    }
    setNewName('')
    setNumber('')
  }
  const Filter = (value) =>{
    console.log(value)
    console.log(persons)
    if(value === ''){
      console.log('ylifona');
      setPersons(tmp);
    }
    else {
      setPersons(tmp.filter(person => person.name.toLowerCase().indexOf(value.toLowerCase()) !== -1))
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