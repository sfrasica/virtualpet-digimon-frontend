import React from 'react';
import { Switch, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
// Whatever you import from your actionCreator file will be the second argument in connect's first set of ()


class App extends React.Component{
  
  
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
export default App;
