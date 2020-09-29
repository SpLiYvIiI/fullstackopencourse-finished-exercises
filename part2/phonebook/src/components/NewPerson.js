import React from 'react'


export default ({AddNumber,newName,setNewName,newNumber,setNumber}) =>{
    return(
    <form onSubmit={AddNumber}>
    <div>
      name: <input
       value={newName} 
       onChange={(event)=>{console.log(event.target.value); setNewName(event.target.value);}}
       />
    </div>
    <div>
      number: <input
       value={newNumber} 
       onChange={(event)=>setNumber(event.target.value)}
       />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
    )
}