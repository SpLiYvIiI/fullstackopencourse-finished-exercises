import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({func,text}) => <button onClick={func}>{text}</button> 
const App = ({anecdotes}) => {
  const [all, setAnecdote] = useState(anecdotes.map(x=>({anecdote : x , counter : 0})));
  const [selected,setSelected] = useState(Math.floor(Math.random()*all.length));
  const getMostVisited = () =>{
    let anecdote = "No votes has been subbmited yet";
    let maximum = 0;
    for(let i =0; i< all.length; i++)
    {
      if(all[i].counter > maximum){
        maximum = all[i].counter;
        anecdote = all[i].anecdote;
      }
    }
    return anecdote;
  }
  return (
    <div>
      <h1>Random anecdotes</h1>
      <p>Anecdote : {all[selected].anecdote}</p>
      <p>Votes : {all[selected].counter}</p>
      <Button func={()=>{setSelected(Math.floor(Math.random()*all.length))}} text="Random anecdote"/>
      <Button func={() => {let tmp = [...all]; tmp[selected].counter++; setAnecdote(tmp);}} text="Vote"/>
      <h1>Anecdote with most votes</h1>
      <p>{getMostVisited()}</p>
    </div>
  )
}
let anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes = {anecdotes}/>,document.getElementById('root'))