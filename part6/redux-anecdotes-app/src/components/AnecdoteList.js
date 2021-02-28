import React from 'react'
import { connect} from 'react-redux'
import {addLike} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const anecdoteList =  (props)=>{
    const vote = (anecdote) => {
        props.addLike(anecdote)
        props.setNotification(`you voted '${anecdote.content}'`,5000)
      }
    return(
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </div>
    )
}

const mapStateToProps =  (state) => {
  if(state.filter === ''){
    return {anecdotes : state.anecdote }
  }
  else{
    return  {anecdotes : state.anecdote.filter(anecdote => anecdote.content.toLowerCase().indexOf(state.filter.toLowerCase()) !== -1) }
  }
}
const mapDispatchToProps = {
  addLike,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(anecdoteList)