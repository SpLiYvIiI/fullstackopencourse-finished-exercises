import React from 'react'
import {Link} from 'react-router-dom'
import {Table} from 'react-bootstrap'
import { useSelector} from 'react-redux'


const Users = () => {
    const blogs = useSelector(state => state.blog)
    const users = useSelector(state => state.users)
    const calcLen= (id) => {
        const arr = blogs.filter(blog => blog.user.id === id)
        return arr.length
    }
    return(
        <div>
            <Table striped>
                <tbody>
                    <tr>
                        <th>Users</th>
                        <th>Blogs Created</th>
                    </tr>
                    {users.map((user,i)=>{
                        return (
                        <tr key={i}>
                            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                            <td>{calcLen(user.id)}</td>
                        </tr>
                        )
                    })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Users