import React,{useState} from 'react'
import { Form,Button } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {updateBlog,deleteBlog,addComment} from '../reducer/blogReducer'
import {setNotification} from '../reducer/notificationReducer'

const Blog = () => {
  const [comment, setComment] = useState('')
  const id = useParams().id
  const histroy = useHistory()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)
  const blog = blogs.find(blog => blog.id === id)
  const addLikes = async () => {
    const newBlog = { ...blog }
    newBlog.likes = newBlog.likes +1
    try {
        await dispatch(updateBlog(newBlog))
     dispatch(setNotification('blog updated succesfully','succ',5000))
        }
        catch(error){
     dispatch(setNotification('something went wrong','err',5000))
   }
  }
  const delBlog = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      try{
        await dispatch(deleteBlog(blog.id))
        dispatch(setNotification('blog deleted succesfully','succ',5000))
        histroy.push('/')
      }
      catch(error){
        dispatch(setNotification('something went wrong','err',5000))
      }
    }
  }
  const addComm = async () =>{
    try{
      await dispatch(addComment(comment,id))
      dispatch(setNotification('comment succesfully added','succ',5000))
    }
    catch(error){
      dispatch(setNotification('something went wrong','err',5000))
    }
  }
  const curr = window.localStorage.getItem('loggedUser')
  const parsed = JSON.parse(curr)
  if(!blog) return null
  else{
  return (
          <div key = {blog.id} className="blogs">
            | Title : {blog.title} | Author : {blog.author} |
            <p>url : {blog.url}</p>
            <p className ="likes-count">likes {blog.likes} <button onClick={addLikes}>add</button></p>
            <p>{blog.user.name}</p>
            {parsed ? parsed.username === blog.user.username ? <p><button onClick={delBlog}>delete</button></p> : <></>:<></>}
            <h3>comments : </h3>
             {blog.comments.map(comment => <p>{comment}</p>)}
             <Form onSubmit={addComm}>
                <Form.Group>
                    <Form.Label>Comment : </Form.Label>
                    <Form.Control type="text"  value={comment} onChange={({target})=>setComment(target.value)}/>
                </Form.Group>
                <Button variant="primary" size="md" type="submit" block>
                    Add Comment
                </Button>
            </Form>
          </div>
  )
  }
}
Blog.displayName = 'Blog'
export default Blog
