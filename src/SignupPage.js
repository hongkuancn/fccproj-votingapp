import React from "react";
import PropTypes from 'prop-types';
import validateInput from './validators/signup';
import bcrypt from 'bcryptjs';
import { connect } from 'react-redux';

import { signupUser } from './actions/public';

class SignupPage extends React.Component {
  state = {
    username: '',
    password: '',
    passwordConfirmation: '',
    errors: {}
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateInput(this.state);
    if(isValid){
      const { username, password } = this.state;
      const password_digest = bcrypt.hashSync(password, 10);
      this.props.signupUser({ username, password_digest})
    }
  }

  render(){
    return (
      <form className="container-fluid" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <label>Password Confirmation</label>
          <input type="password" className="form-control" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    )
  }
};

SignupPage.propTypes = {
  signupUser: PropTypes.func.isRequired
}

export default connect(null, { signupUser })(SignupPage);
