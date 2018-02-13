import React from "react";
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
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
          <li className="nav-item">
            <Link to="/signuptwitter" className="nav-link">Sign up with Twitter</Link>
          </li>
        </ul>
      </nav>
    )
  }
};

export default Navigation;
