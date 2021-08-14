import React, { useState } from 'react'
import {useMutation} from '@apollo/client'
import {UPDATE_BORN,ALL_AUTHORS} from '../query'

const Authors = ({ notify , authors}) => {
  const [name,setName] = useState(authors[0].name || '')
  const [born,setBorn] = useState('')
  const [updateBorn] = useMutation(UPDATE_BORN,{
    refetchQueries : [{query : ALL_AUTHORS}],
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
    }
  })
  const submit = async (event) => {
    event.preventDefault()
    updateBorn({variables : {name,setBornTo : parseInt(born)}})
    setBorn('')
  }
  return (
    <div>
      <h1>authors</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
            <form onSubmit={submit}>
              <h2>Set birthday</h2>
              <select value={name} onChange={ ({target}) => {setName(target.value)}}>
                  {authors.map(a =>
                  <option key={a.name} value={a.name}>{a.name}</option>
                  )}
              </select>
              <div>
              born :  <input value = {born} onChange={({target})=> setBorn(target.value)}></input>
              </div>
              <button type="submit">update</button>
            </form>
    </div>
  )
}

export default Authors
