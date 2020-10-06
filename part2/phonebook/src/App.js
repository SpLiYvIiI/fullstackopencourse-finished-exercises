import React, { useState , useEffect } from 'react'
import Persons from './components/Persons.js'
import NewPerson from './components/NewPerson.js'
import FindPerson from './components/FindPerson.js'
import PersonService from './services/PersonService'
import Notification from './components/Notification'
const App = () => {
  const[Initial,setInitial] = useState([])
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [Person , setPerson] = useState('')
  const [Message, setMessage] = useState({message : null,type : null})
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
      setMessage({
        message : 'Number was succesfully added',
        type : 'succ'
      }
      )
      setTimeout(() => {
        setMessage({
          message : null,
          type : null
        })
      }, 5000)
    })
    }
    else {
      if(window.confirm(`${newName} is already in database do you want to update a number ?`)){
        const perObj = persons.find(person=>person.name.toLowerCase() === newName.toLowerCase())
        const newObj = {...perObj,number:newNumber}
        PersonService.updateNumber(perObj.id,newObj).then(newOb =>{
          setMessage({
            message : 'Number was succesfully changed',
            type : 'succ'
          }
          )
          setTimeout(() => {
            setMessage({
              message : null,
              type : null
            })
          }, 5000)
        }).catch(error=>{
          setMessage({
            message : 'Number was already removed from server',
            type : 'err'
          }
          )
          setTimeout(() => {
            setMessage({
              message : null,
              type : null
            })
          }, 5000)
        })
        console.log(newObj)
        setInitial(Initial.map(per => per.id === newObj.id ? newObj: per))
        setPersons(persons.map(per => per.id === newObj.id ? newObj: per))
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
    PersonService.deleteNumber(id).then(Res =>{
      setMessage({
        message : 'Number was succesfully deleted',
        type : 'succ'
      }
      )
      setTimeout(() => {
        setMessage({
          message : null,
          type : null
        })
      }, 5000)
    })
    setInitial(Initial.filter(per => per.id !== id))
    setPersons(persons.filter(per=> per.id !== id))
    }
  }
  return (
    <div>
      <Notification message={Message.message} type={Message.type}/>
      <h2 className='titles'>Phonebook</h2>
      <FindPerson Filter={Filter} setPerson={setPerson} Person={Person}/>
      <h2 className='titles'>Add number</h2>
      <NewPerson AddNumber={AddNumber} newName={newName} setNewName={setNewName} newNumber={newNumber} setNumber={setNumber}/>
      <h2 className='titles'>Numbers</h2>
      <Persons persons={persons} deleteNumber={deleteNumber}/>
    </div>
  )
}

export default App