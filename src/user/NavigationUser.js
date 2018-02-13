import React from "react";
import { Link } from 'react-router-dom';
import { logout } from '../actions/user';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NavigationUser extends React.Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.logout();
  }

  render(){
    const { username } = this.props;
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <Link to="/private" className="navbar-brand">Votex</Link>

        <ul className="navbar-nav ml-auto">
          <li><a className="nav-link disabled mr-3">Welcome {username}</a>
          </li>
          <li className="nav-item mr-3">
            <Link to="/private/mypolls" className="nav-link">My Polls</Link>
          </li>
          <li className="nav-item mr-3">
            <Link to="/private/newpoll" className="nav-link">New Poll</Link>
          </li>
          <li className="nav-item" onClick={this.handleClick}>
            <Link to="/" className="nav-link">Log out</Link>
          </li>
        </ul>
      </nav>
    )
  }
};

NavigationUser.propTypes = {
  logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(NavigationUser);
