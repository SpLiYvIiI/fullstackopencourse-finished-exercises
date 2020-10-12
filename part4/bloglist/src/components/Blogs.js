import React from 'react'


export default ({Blogs})=>     <ul>
{Blogs.map((blog,i)=>{
  return(<li key={i}>
    <div>
    <h1>{blog.title}</h1>
    </div>
  </li>)
})}
</ul>