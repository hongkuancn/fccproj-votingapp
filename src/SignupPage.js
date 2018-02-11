import React from "react";
import PropTypes from 'prop-types';
import validateInput from './validators/signup';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { signupUser, isUserExist } from './actions/public';

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
    let { errors, isValid } = validateInput({ username, password, passwordConfirmation });
    this.setState({ errors });
    if(isValid){
      const { username, password } = this.state;
      this.props.signupUser({ username, password })
      // redirect to login page after signup
        .then(res =>  this.props.history.push('/login'))
        .catch(err => {
          if (err.response){
            this.setState({ errors: err.response.data });
          }
        })
    } else {
      this.setState({ errors });
    }
  }

  handleBlur = (e) => {
    const username = e.target.value;
    if(username !== ''){
      this.props.isUserExist(username)
      .catch(err => {
        if (err.response){
          this.setState({ errors: err.response.data });
        }
      })
    }
  }

  render(){
    const { errors } = this.state;
    return (
      <form className="container-fluid pt-3" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="lb-lg">Username</label>
          <input type="text" className={classnames('form-control', {'is-invalid': errors.username})} name="username" value={this.state.username} onChange={this.handleChange} onBlur={this.handleBlur}/>

          {errors.username  && (
            <div className="alert alert-danger" role="alert">
              {errors.username}
            </div>)}
        </div>
        <div className="form-group">
          <label className="lb-lg">Password</label>
          <input type="password" className={classnames('form-control', {'is-invalid': errors.password})} name="password" value={this.state.password} onChange={this.handleChange}/>

          {errors.password  && (
            <div className="alert alert-danger" role="alert">
              {errors.password}
            </div>)}
        </div>
        <div className="form-group">
          <label className="lb-lg">Password Confirmation</label>
          <input type="password" className={classnames('form-control', {'is-invalid': errors.passwordConfirmation})} name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange}/>

          {errors.passwordConfirmation  && (
            <div className="alert alert-danger" role="alert">
              {errors.passwordConfirmation}
            </div>)}
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    )
  }
};

SignupPage.propTypes = {
  signupUser: PropTypes.func.isRequired,
  isUserExist: PropTypes.func.isRequired
}

export default connect(null, { signupUser, isUserExist })(SignupPage);
