import React from 'react'
import { ListGroup } from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

const User = () => {
    const id = useParams().id
    const users = useSelector(state => state.users) 
    const blogs = useSelector(state => state.blog)
    const user =  users.find(user => user.id === id)
    if(!user || !blogs) return null
    else{
    const allBlogs = blogs.filter(blog=> blog.user.id === user.id)
    return(
        <div>
            <h1>{user.name}</h1>
            <h3>     blogs added : </h3>
            <ListGroup variant="flush">
                {allBlogs.map(blog => 
                    <ListGroup.Item key={blog.id}> 
                        {blog.title}
                    </ListGroup.Item>)}
            </ListGroup> 
        </div>
    )
    }
}

export default User