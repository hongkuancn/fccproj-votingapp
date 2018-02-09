import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import NavigationUser from './user/NavigationUser';
import { withRouter, Switch, Route, Link } from 'react-router-dom';

import ListPage from './ListPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import WelcomePage from './user/WelcomePage';
import './App.css';
import './bootstrap.min.css';

class App extends Component {

  render() {
    const {isAuthenticated, username } = this.props;

    return (
      <div>
        {isAuthenticated ? <NavigationUser username={username}/> : <Navigation />}
        <Switch>
         <Route exact path="/" component={ListPage} />
         <Route path="/signup" component={SignupPage} />
         <Route path="/login" component={LoginPage} />
         <PrivateRoute path="/private" component={WelcomePage} isAuthenticated={isAuthenticated} username={username}/>
       </Switch>
      </div>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  username: PropTypes.string
}

function mapStateToProps(state){
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    username: state.Auth.user
  }
}

export default withRouter(connect(mapStateToProps, {})(App));
