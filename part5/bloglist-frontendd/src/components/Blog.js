import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, handleBlogUpdate,handleBlogDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const addLikes = () => {
    const newBlog = { ...blog }
    newBlog.likes = newBlog.likes +1
    handleBlogUpdate(newBlog)
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const deleteBlog = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      handleBlogDelete(blog.id)
      setVisible(!visible)
    }
  }
  const curr = window.localStorage.getItem('loggedUser')
  const parsed = JSON.parse(curr)
  return (
    <div>
      <div style={hideWhenVisible} className="togglableContent0">
        <div style={blogStyle}>
          <div className="blogs">
          | Title : {blog.title} | Author : {blog.author} |
            <button id = 'view-button' onClick={toggleVisibility}>view</button>
          </div>
        </div>
      </div>
      <div style={showWhenVisible} className= 'togglableContent1'>
        <div style={blogStyle}>
          <div key = {blog.id} className="blogs">
      | Title : {blog.title} | Author : {blog.author} |
            <button id = 'hide-button' onClick={toggleVisibility}>hide</button>
            <p>url : {blog.url}</p>
            <p className ="likes-count">likes {blog.likes} <button onClick={addLikes}>add</button></p>
            <p>{blog.user.name}</p>
            {parsed ? parsed.username === blog.user.username ? <p><button onClick={deleteBlog}>delete</button></p> : <></>:<></>}
          </div>
        </div>
      </div>
    </div>
  )
}
Blog.displayName = 'Blog'
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleBlogUpdate: PropTypes.func.isRequired,
  handleBlogDelete: PropTypes.func.isRequired
}
export default Blog
