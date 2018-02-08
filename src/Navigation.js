import React from "react";
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  render(){
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">Votex</Link>

        <ul className="navbar-nav ml-auto">
          <li><a className="nav-link disabled">Welcome</a></li>
          <li>
            <Link to="/signup" className="nav-link">Sign up</Link>
          </li>
          <li>
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li>
            <Link to="/signuptwitter" className="nav-link">Sign up with Twitter</Link>
          </li>
        </ul>
      </nav>
    )
  }
};

export default Navigation;
