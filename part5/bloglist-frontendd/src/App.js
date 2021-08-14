import React, { useState, useEffect , useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from  './services/loginService'
import Notification from './components/Notification'
import AddBlog  from './components/AddBlog'
import LoginForm from './components/LoginForm'
import TogglableComponent from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser] = useState(null)
  const [Message, setMessage] = useState({ message : null,type : null })
  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => a.likes < b.likes ? 1 : (a.likes  > b.likes ? -1 :0))
      setBlogs(blogs)
    }
    )
  }, [])
  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem('loggedUser')
    if(isLoggedIn){
      const parsed = JSON.parse(isLoggedIn)
      setUser(parsed)
      blogService.setToken(parsed.token)
    }
  },[])
  const blogFormRef = useRef()
  const handleLogin = async (newObj) => {
    try{
      const resp = await loginService.signIn(newObj)
      window.localStorage.setItem('loggedUser',JSON.stringify(resp))
      setUser(resp)
      blogService.setToken(resp.token)
    }
    catch(error){
      setMessage({
        message : 'invalid username or password',
        type : 'err'
      }
      )
      setTimeout(() => {
        setMessage({
          message : null,
          type : null
        })
      }, 5000)
    }

  }
  const handleBlogUpdate = async (updObj) => {
    try{
      const resp = await blogService.updateBlog(updObj)
      let newblogs = blogs.map(blog => blog.id === resp.id ? updObj : blog)
      newblogs.sort((a, b) => a.likes < b.likes ? 1 : (a.likes  > b.likes ? -1 :0))
      setBlogs(newblogs)
    }
    catch(error){
      setMessage({
        message : 'something went wrong',
        type : 'err'
      }
      )
      setTimeout(() => {
        setMessage({
          message : null,
          type : null
        })
      }, 5000)
    }
  }
  const handleBlogDelete = async (blogId) => {
    try{
      await blogService.deleteBlog(blogId)
      setMessage({
        message : 'blog deleted succesfully' ,
        type : 'succ'
      }
      )
      setTimeout(() => {
        setMessage({
          message : null,
          type : null
        })
      }, 5000)
    }
    catch(error){
      setMessage({
        message : 'something went wrong',
        type : 'err'
      }
      )
      setTimeout(() => {
        setMessage({
          message : null,
          type : null
        })
      }, 5000)
    }
    const newblogs = blogs.filter(blog => blog.id !== blogId)
    setBlogs(newblogs)
  }
  const handeBlogAdd = async (newObj) => {
    try{
      const resp = await blogService.addBlog(newObj)
      blogFormRef.current.toggleVisibility()
      const upd = await blogService.getAll()
      setBlogs(upd)
      setMessage({
        message : `a new blog ${resp.title} by ${resp.author} added` ,
        type : 'succ'
      }
      )
      setTimeout(() => {
        setMessage({
          message : null,
          type : null
        })
      }, 5000)
    }
    catch(error){
      setMessage({
        message : 'something went wrong',
        type : 'err'
      }
      )
      setTimeout(() => {
        setMessage({
          message : null,
          type : null
        })
      }, 5000)
    }
  }
  const loggedInForm = () => {
    return (
      <div>
        <h2>{user.name} logged in <button onClick = {() => {setUser(null); window.localStorage.clear()}}>log out</button></h2>
        <TogglableComponent buttonLabel = "create new blog" ref={blogFormRef}>
          <AddBlog handleBlogAdd={handeBlogAdd}/>
        </TogglableComponent>
        <h1 className="titles">All blogs</h1>
        {
          blogs.map(blog => {
            return(
              <div key = {blog.id}>
                <Blog  blog ={blog} handleBlogUpdate={handleBlogUpdate} handleBlogDelete ={handleBlogDelete}/>
              </div>)
          })
        }
      </div>
    )
  }
  const loggedOutForm = () => {
    return(
      <LoginForm handleLogin={handleLogin}/>
    )
  }

  return (
    <div>
      <Notification message={Message.message} type={Message.type}/>
      {user === null ? loggedOutForm() : loggedInForm()}
    </div>
  )
}

export default App