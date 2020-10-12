import React, { useEffect, useState } from 'react';
import BlogService from './services/Blogservice'
import Blogs from './components/Blogs'


export default ()=>{
  const [blogs,setBlogs] = useState([])
  useEffect(()=>{
    BlogService.getAll().then(InitialData=>{
      setBlogs(InitialData)
    })
  },[])
  return(
    <div>
    <h1>Blog List</h1>
    <Blogs Blogs={blogs}/>
    </div>
    )
}