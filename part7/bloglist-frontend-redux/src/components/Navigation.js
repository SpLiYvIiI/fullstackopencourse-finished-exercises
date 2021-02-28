import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {logOut} from '../reducer/loginReducer' 
import {Link} from 'react-router-dom'
import {Navbar,Nav,Form,Button} from 'react-bootstrap'


const Navigation = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const padding = {
        padding: 5
    }
    return(
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#" as="span">
                            <Link style={padding} to="/">blogs</Link>
                            </Nav.Link>
                            <Nav.Link href="#" as="span">
                                <Link style={padding} to="/users">users</Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    {user?<Form inline>
                        <Nav.Item style={{color: '#fff', marginRight: "10px"}}>{user.name} logged in</Nav.Item>
                        <Button onClick={()=>{dispatch(logOut())}}>Log Out</Button>
                    </Form>:<Link style={padding} to="/login">login</Link>}
            </Navbar>            
        </div>
    ) 
}

export default Navigation