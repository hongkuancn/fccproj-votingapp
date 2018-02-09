import React from "react";
import { Link } from 'react-router-dom';

class NavigationUser extends React.Component {
  render(){
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <Link to="/private" className="navbar-brand">Votex</Link>

        <ul className="navbar-nav ml-auto">
          <li>
            <Link to="/private/:userid/mypolls" className="nav-link">My Polls</Link>
          </li>
          <li>
            <Link to="/private/:userid/newpoll" className="nav-link">New Poll</Link>
          </li>
          <li>
            <Link to="/" className="nav-link">Log out</Link>
          </li>
        </ul>
      </nav>
    )
  }
};

export default NavigationUser;
