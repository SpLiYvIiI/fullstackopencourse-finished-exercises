import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {isLoggedIn} from './reducer/loginReducer'
import Notification from './components/Notification'
import AppRoute from './components/AppRoute'
import { Container } from 'react-bootstrap'



const App = () => {
  const dispatch= useDispatch()
  const Message = useSelector(state => state.notification)
  useEffect(()=>{
    dispatch(isLoggedIn())
  },[dispatch])
  return (
    <div>
      <Container fluid>
      <Notification message={Message.message} type={Message.typ}/>
      <AppRoute />
      </Container>
    </div>
  )
}

export default App