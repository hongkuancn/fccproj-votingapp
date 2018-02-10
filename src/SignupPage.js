import React from "react";
import PropTypes from 'prop-types';
import validateInput from './validators/signup';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { signupUser } from './actions/public';

class SignupPage extends React.Component {
  state = {
    username: '',
    password: '',
    passwordConfirmation: '',
    errors: {}
  }

  handleChange = (e) => {
    this.setState({ errors: {}})
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirmation } = this.state;
    const { errors, isValid } = validateInput({ username, password, passwordConfirmation });
    this.setState({ errors });
    if(isValid){
      const { username, password } = this.state;
      this.props.signupUser({ username, password })
        .then(() =>  this.props.history.push('/login'))
        .catch(err => this.setState({ errors: err.response.data }))
    } else {
      this.setState({ errors });
    }
  }

  render(){
    const { errors } = this.state;
    return (
      <form className="container-fluid" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className={classnames('form-control', {'is-invalid': errors.username})} name="username" value={this.state.username} onChange={this.handleChange}/>
          { errors.username && <div className="invalid-feedback">{errors.username}</div> }
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className={classnames('form-control', {'is-invalid': errors.password})} name="password" value={this.state.password} onChange={this.handleChange}/>
          { errors.password && <div className="invalid-feedback">{errors.password}</div> }
        </div>
        <div className="form-group">
          <label>Password Confirmation</label>
          <input type="password" className={classnames('form-control', {'is-invalid': errors.passwordConfirmation})} name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange}/>
          { errors.passwordConfirmation && <div className="invalid-feedback">{errors.passwordConfirmation}</div> }
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
