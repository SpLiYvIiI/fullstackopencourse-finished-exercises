import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'

const numbers = [
  { name: 'Arto Hellas' }
] 

ReactDOM.render(
  <React.StrictMode>
    <App numbers={numbers}/>
  </React.StrictMode>,
  document.getElementById('root')
);
