import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import NavigationUser from './user/NavigationUser';
import { withRouter, Switch, Route } from 'react-router-dom';

import ListPage from './ListPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import WelcomePage from './user/WelcomePage';
import FlashMessage from './FlashMessage';
import { closeMessage } from './actions/public';
import './App.css';
import './bootstrap.min.css';

class App extends Component {

  render() {
    const {isAuthenticated, username, message } = this.props;

    return (
      <div>
        { isAuthenticated ? <NavigationUser username={username}/> : <Navigation />}
        { message && <FlashMessage message={message} closeMessage={this.props.closeMessage}/> }
        <Switch>
         <Route path="/signup" component={SignupPage} />
         <Route path="/login" component={LoginPage} />
         <PrivateRoute path="/private" component={WelcomePage} isAuthenticated={isAuthenticated} username={username}/>
         <Route path="/" component={ListPage} />
       </Switch>
      </div>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  username: PropTypes.string,
  message: PropTypes.string.isRequired,
  closeMessage: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    username: state.Auth.user,
    message: state.FlashMessage.message
  }
}

export default withRouter(connect(mapStateToProps, { closeMessage })(App));
