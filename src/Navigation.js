import React from "react";
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  render(){
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <a href="/" className="navbar-brand">Votex</a>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-3">
            <Link to="/signup" className="nav-link">Sign up</Link>
          </li>
          <li className="nav-item mr-3">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
        </ul>
      </nav>
    )
  }
};

export default Navigation;
