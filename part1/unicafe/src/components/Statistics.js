import React from 'react'
export default ({good,neutral,bad})=>{
    let all = good+neutral+bad;
    let average = all === 0? 0 : (good+ (-bad))/all;
    let percentage = all === 0 ? 0 : (good/all)*100;
    if(all === 0 ) return(<p>No feedback given</p>)
    else{
    return(
    <div>
    <p>Good : {good}</p>
    <p>Neutral : {neutral}</p>
    <p>Bad : {bad}</p>
    <p>All : {all}</p>
    <p>Average : {average}</p>
    <p>Percentage : {percentage}%</p>
    </div>
    )
    }
  }