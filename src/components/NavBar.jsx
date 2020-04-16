import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {connect,} from 'react-redux'
import {logOut, filterDigimons} from '../Redux/actions'
import {Nav, Navbar, Form, FormControl} from 'react-bootstrap'

const NavBar = (props) => {

  const [submitted, handleSubmit] = useState(false)


    const handleClick = () => {
        console.log("Logging out");
        props.logOut()
        handleSubmit(!submitted)
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
          <NavLink className="" to="/">DigiFarm</NavLink>
        </Nav.Link>
        <> {submitted ? 
          <>
        <Nav.Link>
          <NavLink className="" to="/login">Login</NavLink>
          <br/>
          </Nav.Link>
          <Nav.Link>
          <NavLink className="" to="/register">Register</NavLink>
          <br/>
        </Nav.Link></> : null}    </>
       
        <Nav.Link>
          <NavLink className="" to="/team">Team</NavLink>
          <br/>
          </Nav.Link>
          <Nav.Link>
          <NavLink className="" to="/game">Game</NavLink>
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
    searchTerm: reduxState.digimons.searchTerm,
    user: reduxState.user
  }
}

export default connect(mapStateToProps, {logOut, filterDigimons})(NavBar);
