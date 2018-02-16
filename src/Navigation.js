import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUpWithTwitter } from './actions/public';

class Navigation extends React.Component {

  handleClick = () => {
    this.props.signUpWithTwitter()
      .catch(err => console.log(err.response))
  }

  render(){
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <Link to="/" className="navbar-brand">Votex</Link>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-3">
            <Link to="/signup" className="nav-link">Sign up</Link>
          </li>
          <li className="nav-item mr-3">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item" onClick={this.handleClick}>
            <Link to="/" className="nav-link">Sign up with Twitter</Link>
          </li>
          <li className="nav-item">
            <a href="http://localhost:8080/api/twitter" className="nav-link">Sign up with Twitter</a>
          </li>
        </ul>
      </nav>
    )
  }
};

export default connect(null, { signUpWithTwitter })(Navigation);
