import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
// import * as serviceWorker from './serviceWorker';


//Redux
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'


//provide access to all reducers
let rootReducer = combineReducers({
 
})


let store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


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
