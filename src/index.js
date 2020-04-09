import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
// import * as serviceWorker from './serviceWorker';


//Redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'



import userReducer from './Redux/userReducer'
import digimonReducer from './Redux/digimonReducer'
// import userDigimonReducer from './Redux/userDigimonReducer'

//provide access to all reducers
let rootReducer = combineReducers({
  user: userReducer,
  digimons: digimonReducer
  // user_digimons: userDigimonReducer
})


let store = createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))


ReactDOM.render(
  <Provider store = {store}>
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
