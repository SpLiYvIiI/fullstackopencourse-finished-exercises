import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {Form,Button} from 'react-bootstrap'
import {addBlog} from '../reducer/blogReducer'
import {setNotification} from '../reducer/notificationReducer'

const Addblog = () => {
  const dispatch = useDispatch()
  const [newTitle,setTitle] = useState('')
  const [newAuthor,setAuthor] = useState('')
  const [newUrl , setUrl] = useState('')
  const adBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title : newTitle,
      author : newAuthor,
      url : newUrl,
      likes : 0
    }
    setAuthor('')
    setTitle('')
    setUrl('')
      try{
        await dispatch(addBlog(newBlog))
      }
      catch(error){
        dispatch(setNotification('something went wrong','err',5000))
      }
  }
  return(
    <Form onSubmit={adBlog}>
      <h1 className="titles">Add new blog</h1>
    <Form.Group>
      <Form.Label>title:</Form.Label>
      <Form.Control id="title" value={newTitle} onChange={({ target }) => {setTitle(target.value)}} />
      <Form.Label>author:</Form.Label>
      <Form.Control id = "author" value={newAuthor} onChange={({ target }) => {setAuthor(target.value)}} />
      <Form.Label>url:</Form.Label>
      <Form.Control id= "url" value={newUrl} onChange={({ target }) => {setUrl(target.value)}}  />
      <Button id = 'add-blog-button' type="submit">
        Add Blog
      </Button>
    </Form.Group>
    </Form>
  )
}
Addblog.displayName = 'Addblog'
export default Addblog