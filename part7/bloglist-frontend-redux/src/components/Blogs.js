import React from 'react'
import {Link} from 'react-router-dom'
import AddBlog from './AddBlog'
import {Table} from 'react-bootstrap'
import {useSelector} from 'react-redux'


const Blogs = () =>{
    const blogs = useSelector(state => state.blog)
    return(
       <div>
        <AddBlog />
      <h1 style={{textAlign:'center'}} className="titles">All blogs</h1>
        <Table striped>
            <tbody>
                <tr>
                    <th>Blog Titles</th>
                    <th>Blog Authors</th>
                </tr>
                {blogs.map((blog,i)=>{
                    return (
                    <tr key={blog.id}>
                        <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
                        <td>{blog.author}</td>
                    </tr>
                    )
                })
                }
            </tbody>
        </Table>          
      </div>
    )
}

export default Blogs