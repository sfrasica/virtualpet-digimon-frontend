import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Form from './components/Form'
import NavBar from './components/NavBar'
import Home from './components/Home'
import TeamContainer from './ProfileComponents/TeamContainer'
import './App.css';
import { withRouter } from 'react-router-dom'
import { Button, Card, Container, Column, Row, CardImg } from 'react-bootstrap'

import { connect } from 'react-redux'
// Whatever you import from your actionCreator file will be the second argument in connect's first set of ()
import {setAllDigimons, setUserInformation} from './Redux/actions'

class App extends React.Component{
  
  
  componentDidMount() {
    if (localStorage.token) {
      fetch("http://localhost:3000/persist", {
        headers: {
          "Authorization": `bearer ${localStorage.token}`
        }
      })
      .then(r => r.json())
      .then((resp) => {
        console.log(resp)
        this.props.setUserInformation(resp)
        this.props.history.push("/")
      })
    }

    fetch("http://localhost:3000/digimons")
    .then(r => r.json())
    .then((digimons)=> {
      this.props.setAllDigimons(digimons)
    })

  }

  handleResp = (resp) => {
    if (resp.user) {
      console.log(this.props.history.push)
      localStorage.token = resp.token
      this.props.setUserInformation(resp)
          this.props.history.push("/profile")
      } 
      else {
        alert(resp.error)
      }
    }

  //   handleResponse = (response) => {
  //   if (response.user) {
  //     localStorage.token = response.token
  //     this.setState(response, () => {
  //       this.props.history.push("/profile")
  //     })
  //   } else {
  //     alert(response.error)
  //   }
  // }

  handleLoginSubmit = (userInfo) => {
    console.log("Login form has been submitted")

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
    .then(r => r.json())
    .then(this.handleResp)

  }

  

  handleRegisterSubmit = (userInfo) => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    })
    .then(r => r.json())
    .then(this.handleResp)

  }

  handleRegister = (userInfo) => {
    // console.log(userInfo);
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
    .then(r => r.json())
    .then(this.handleResponse)
  }




  renderForm = (routerProps) => {
    if (this.props.token) {
      return <h2>Already logged in as {this.props.username}</h2>
    }
    if(routerProps.location.pathname === "/login") {
      return <Form  formName="Login Form" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/register") {
      return <Form formName="Register Form" handleSubmit={this.handleRegisterSubmit}/>
    }
  }

  renderProfile = (routerProps) => {
    return <TeamContainer />
  }


  render(){
    console.log(this.props)
    return (
      <div className="App">
      <div className="login">
          <NavBar/>
          <Switch>
            <Route path="/login" render={ this.renderForm } />
            <Route path="/register" render={ this.renderForm } />
            <Route path="/profile" render={ this.renderProfile } />
            <Route path="/" exact render={() => <Home />} />
            <Route render={ () => <p>Page not Found</p>} />
        
        </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    token: reduxState.user.token,
    username: reduxState.user.username
  }
}



// export default App
export default withRouter(
  connect(mapStateToProps, {setAllDigimons, setUserInformation})(App)
  )
