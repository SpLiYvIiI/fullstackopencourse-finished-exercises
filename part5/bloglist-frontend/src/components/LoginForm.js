import React,{ useState }from 'react'

const LoginForm =  ({ handleLogin }) => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const Login = (event) => {
    event.preventDefault()
    const newobj = {
      username : username,
      password : password
    }
    handleLogin(newobj)
    setUsername('')
    setPassword('')
  }
  return(
    <div>
      <h1>Login into account</h1>
      <form onSubmit={Login}>
        <div>
            username
          <input
            id = 'username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            id = 'password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id ='login-button' type="submit">login</button>
      </form>
    </div>
  )
}
LoginForm.displayName= 'LoginForm'

export default LoginForm
