import React from 'react'


export default ({AddNumber,newName,setNewName}) =>{
    return(
    <form onSubmit={AddNumber}>
    <div>
      name: <input
       value={newName} 
       onChange={(event)=>setNewName(event.target.value)}
       />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
    )
}