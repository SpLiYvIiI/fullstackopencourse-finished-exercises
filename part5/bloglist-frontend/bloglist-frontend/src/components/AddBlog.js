import React, { useState } from 'react'

const Addblog = ({ handleBlogAdd }) => {
  const [newTitle,setTitle] = useState('')
  const [newAuthor,setAuthor] = useState('')
  const [newUrl , setUrl] = useState('')
  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title : newTitle,
      author : newAuthor,
      url : newUrl,
      likes : 0
    }
    handleBlogAdd(newBlog)
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return(
    <form onSubmit={addBlog}>
      <h1 className="titles">Add new blog</h1>
      <div>
      title : <input id="title" value={newTitle} onChange={({ target }) => {setTitle(target.value)}}></input>
      </div>
      <div>
      author : <input id = "author" value={newAuthor} onChange={({ target }) => {setAuthor(target.value)}}></input>
      </div>
      <div>
      url : <input id= "url" value={newUrl} onChange={({ target }) => {setUrl(target.value)}}></input>
      </div>
      <button id = 'add-blog-button' type="submit">Add</button>
    </form>
  )
}
Addblog.displayName = 'Addblog'
export default Addblog