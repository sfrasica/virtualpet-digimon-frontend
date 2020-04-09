import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {logOut, filterDigimons} from '../Redux/actions'
import {Nav, Navbar, Form, FormControl} from 'react-bootstrap'

const NavBar = (props) => {

    const handleClick = () => {
        console.log("Logging out");
        props.logOut()
        localStorage.clear()
        
    }

    const handleChange = (e) => {
      props.filterDigimons(e.target.value)
      console.log(e.target.value)
  }


    return (
      <Navbar bg="dark" variant="dark">
        <Nav fill variant="tabs">
        <Nav.Link>
          <NavLink className="" to="/">Home</NavLink>
        </Nav.Link>
        <Nav.Link>
          <NavLink className="" to="/login">Login</NavLink>
          <br/>
          </Nav.Link>
        <Nav.Link>
          <NavLink className="" to="/register">Register</NavLink>
          <br/>
        </Nav.Link>
        <Nav.Link>
          <NavLink className="" to="/profile">Profile</NavLink>
          <br/>
          </Nav.Link>
          </Nav>
          <Form inline onChange={handleChange} value={props.searchTerm}>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form>
          <button onClick={handleClick}>Log out</button>
     
      </Navbar>
    )
}

const mapStateToProps = (reduxState) => {
  return {
    searchTerm: reduxState.digimons.searchTerm
  }
}

export default connect(mapStateToProps, {logOut, filterDigimons})(NavBar);
