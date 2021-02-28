import React,{ useState }from 'react'
import {useDispatch} from 'react-redux'
import {Form,Button,} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import {loginUser} from '../reducer/loginReducer'
import {setNotification} from '../reducer/notificationReducer'

const LoginForm =  () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const Login =async (event) => {
    event.preventDefault()
    const newobj = {
      username : username,
      password : password
    }
    setUsername('')
    setPassword('')
      try{
        await dispatch(loginUser(newobj))
        history.push('/')
      }
      catch(error){
        dispatch(setNotification('invalid username or password','err',5000))
      }
  }
  return(
    <div>
      <h1>Login into account</h1>
      <Form onSubmit={Login}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id = 'username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id = 'password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button id ='login-button' type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
      </div>
  )
}
LoginForm.displayName= 'LoginForm'

export default LoginForm
