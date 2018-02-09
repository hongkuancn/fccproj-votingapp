import React from 'react';
import { withRouter, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    rest.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

PrivateRoute.propTypes = {
  Component: PropTypes.element,
  isAuthenticated: PropTypes.bool.isRequired
}

export default withRouter(PrivateRoute);
