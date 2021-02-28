import React from 'react'
import {connect} from 'react-redux'
import {addAnecdote} from '../reducers/anecdoteReducer'

const anecdoteForm =  (props)=>{
  
    const add = async (event) =>{
      event.preventDefault()
      const content = event.target.newanecdote.value
      event.target.newanecdote.value = ''
      props.addAnecdote(content)
    }

    return(
        <div>
        <h2>create new</h2>
        <form onSubmit={add}>
          <div><input name= "newanecdote" /></div>
          <button type='submit'>create</button>
        </form>
        </div>
    )
}
const mapDispatchToProps = {
  addAnecdote,
}
export default connect(
  null,
  mapDispatchToProps
)(anecdoteForm)
