import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {initializeBlogs} from '../reducer/blogReducer'
import {initializeUsers} from '../reducer/usersReducer'
import Blogs from './Blogs'
import Blog from './Blog'
import Login from './Login'
import User from './User'
import Users from './Users'
import {
  Switch, Route, BrowserRouter as Router,Redirect
} from "react-router-dom"
import Navigation from './Navigation'



const LoggedInForm = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
      }, [dispatch])
    const user = useSelector(state => state.user)
    return (
      <div>
        <Router>
        <Navigation />
        <Switch>
          <Route path="/users/:id">
             <User /> 
          </Route>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path = "/blogs">
            <Blogs />
          </Route>
          <Route path="/users">
            <Users /> 
          </Route>
          <Route path = "/login">
            {!user ?  <Login /> : <Redirect to="/"/>}
          </Route>
          <Route path="/">
          {user ? <Blogs /> : <Redirect to="/login"/>}
          </Route>
        </Switch>
        </Router>
      </div>
    )
  }

export default LoggedInForm