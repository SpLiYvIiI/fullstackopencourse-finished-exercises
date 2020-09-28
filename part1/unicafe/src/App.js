import React, { useState } from 'react'
import Statistics from './components/Statistics.js'
import Button from './components/Button.js'

export default ()=>{
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
          <Statistics  good={good} neutral={neutral} bad={bad} />
        </div>
    )
  }