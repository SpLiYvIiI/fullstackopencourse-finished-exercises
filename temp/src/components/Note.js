import React from 'react'


export default ({key,note,ToggleImportance}) =>{
    const label = note.important ? 'make not important' : 'make important'
    return(
     <li key={key}>
         {note.content}
    <button onClick={()=>{ToggleImportance(note.id)}}>{label}</button>
    </li>
    )
}