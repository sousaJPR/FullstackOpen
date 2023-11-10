import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { Container, Nav, Navbar as BSNavbar, Button } from 'react-bootstrap'

const Navbar = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state => state.login.loggedInUser))
  console.log('lged user: ', loggedUser)
  const handleLogout = async () => {
    dispatch(logoutUser())
  };
  if (loggedUser) {
    return (
      <BSNavbar expand='lg' bg='dark' data-bs-theme='dark'>
        <Container className='nav-container'>
          <BSNavbar.Brand href='/'>BlogListApp</BSNavbar.Brand>
          <BSNavbar.Toggle aria-controls='basic-navbar-nav' />
          <BSNavbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/'>BlogList</Nav.Link>
              <Nav.Link href='/createblog'>Create Blog</Nav.Link>
              <Nav.Link href='/users'>Users</Nav.Link>
              <div className='logout-div'>
              <Nav.Link href='#'>{loggedUser.name}</Nav.Link>
              <Button variant='secondary' onClick={handleLogout}>Logout</Button>
              </div>
            </Nav>
          </BSNavbar.Collapse>
        </Container>
      </BSNavbar>
      /* <div style={{ padding: 20, marginBottom: 20, position: 'relative', backgroundColor: 'cyan' }}>
        <Link style={{ paddingRight: 15 }} to='/'>Blog List</Link>
        <Link style={{ paddingRight: 15 }} to='/createblog'>Create Blog</Link>
        <Link style={{ paddingRight: 15 }} to='/users'>Users</Link>
        <span style={{ right: 10, position: 'absolute' }}>{loggedUser.name} <button id="logout-btn" onClick={handleLogout}>Logout</button></span>
      </div> */
    )
  }
  return null
}

export default Navbar