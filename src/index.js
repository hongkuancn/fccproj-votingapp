import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import ListPage from './ListPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import WelcomePage from './user/WelcomePage';
import rootReducer from './rootReducer';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
         <Route exact path="/" component={ListPage} />
         <Route path="/signup" component={SignupPage} />
         <Route path="/login" component={LoginPage} />
         <PrivateRoute path="/private" component={WelcomePage}/>
       </Switch>
      </App>
    </Router>
  </Provider>,
document.getElementById('root'));

registerServiceWorker();
