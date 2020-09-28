import React, { useState } from 'react'
import Button from './components/Button.js'

export default ({anecdotes}) => {
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