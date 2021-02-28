import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'
import Button from './components/Button'
import Statistics from './components/Statistics'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const neutral = () => {
    store.dispatch({
      type : 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type : 'BAD'
    })
  }
  const resetstats = ()=>{
    store.dispatch({
      type : 'ZERO'
    })
  }
  return (
      <div> 
          <h1>Give Feedback</h1>
          <Button func={good} text="good"/>
          <Button func={neutral} text="neutral"/>
          <Button func={bad} text="bad"/>
          <Button func={resetstats} text="reset"/>
          <h1>Statistics</h1>
          <Statistics  good={store.getState().good} neutral={store.getState().ok} bad={store.getState().bad} />
      </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
