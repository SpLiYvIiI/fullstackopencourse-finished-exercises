import React, { useEffect, useState } from 'react';
import BlogService from './services/Blogservice'


export default ()=>{
  const [Blogs,setBlogs] = useState([])
  useEffect(()=>{
    BlogService.getAll().then(InitialData=>{
      setBlogs(InitialData)
    })
  },[])
  return(
    <div>
    <h1>Blog List</h1>
    </div>
    )
}