import anecdoteService from '../services/anecdotes'
const reducer = (state = [], action) => {
  switch(action.type){
    case 'LIKE' : {
      let currVotes = state.find(anecdote => anecdote.id === action.data.id)
      let updatedVotes =  state.map(anecdote => anecdote.id === action.data.id ? {...anecdote,votes : currVotes.votes+1}: anecdote)
      updatedVotes.sort((a, b) => a.votes < b.votes ? 1 : (a.votes  > b.votes ? -1 :0))
      return updatedVotes
    } 
    case 'ADD' : {
      return state.concat(action.data)
    }
    case 'INIT_ANECDOTES' : {
      action.data.sort((a, b) => a.votes < b.votes ? 1 : (a.votes  > b.votes ? -1 :0))
      return action.data
    }
    default : 
  }

  return state
}
export const addLike = (anecdote)=>{
  return async dispatch =>{
    const newObj = {...anecdote,votes : anecdote.votes+1}
    const updatedObj = await anecdoteService.updateAnecdote(newObj)
    dispatch({
      type : 'LIKE',
      data : {
        id : updatedObj.id
      }
    })
  }
}
export const addAnecdote = (content)=>{
  return async dispatch => {
    const newAnecdote = await anecdoteService.addAnecdote(content)
    dispatch({
        type : 'ADD',
        data : newAnecdote
    })
  }
}
export const initializeAnecdotes = (anecdotes) =>{
  return async dispatch =>{
    const initialAnecdotes = await anecdoteService.getAll()
    dispatch({
      type : 'INIT_ANECDOTES',
      data : initialAnecdotes
    })
  }
}

export default reducer