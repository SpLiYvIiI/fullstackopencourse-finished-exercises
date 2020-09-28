import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = ({func,text})=> <><button onClick={func}>{text}</button></>
const Statsitics = ({good,neutral,bad})=>{
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
const App = ()=>{
  const [good,setGood] = useState(0);
  const [neutral,setNeutral] = useState(0);
  const [bad,setBad] = useState(0);
  return (
      <div> 
        <h1>Give Feedback</h1>
        <Button func={()=>{setGood(good+1)}} text="good"/>
        <Button func={()=>{setNeutral(neutral+1)}} text="neutral"/>
        <Button func={()=>{setBad(bad+1)}} text="bad"/>
        <Button func={()=>{setBad(0);setGood(0);setNeutral(0)}} text="reset"/>
        <h1>Statistics</h1>
        <Statsitics  good={good} neutral={neutral} bad={bad} />
      </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))