import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import setAuthenticationToken from './utils/setAuthenticationToken';
import { authenticated } from './actions/public'

import './index.css';
import App from './App';
import rootReducer from './rootReducer';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

//check if the user has already authenticated
let token = localStorage["votex-token"];
if(token){
  setAuthenticationToken(token);
  store.dispatch(authenticated(jwtDecode(token)));
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
document.getElementById('root'));

registerServiceWorker();
