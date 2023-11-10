import { Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"

const AppNavbar = ({ user }) => {
    return (
        <div>
            <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-nabvar-nav">
                    <Nav className='me-auto'>
                        <Nav.Link href='#' as="span">
                            <Link style={{ padding: 5 }} to='/'>Home</Link>
                        </Nav.Link>
                        <Nav.Link href='#' as="span">
                            <Link style={{ padding: 5 }} to='/notes'>Notes</Link>
                        </Nav.Link>
                        <Nav.Link href='#' as="span">
                            <Link style={{ padding: 5 }} to='/users'>Users</Link>
                        </Nav.Link>
                        <Nav.Link href='#' as="span">
                            {user
                                ?   (<em style={{ padding: 5 }}>{user} logged in</em>)
                                :   (<><Link style={{ padding: 5 }} to='/login'>Login</Link> 
                                    <Link style={{ padding: 5 }} to='/styledLogin'>Styled Login</Link></>)
                            }
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default AppNavbar