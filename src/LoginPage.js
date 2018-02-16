import React from "react";
import validateInput from './validators/login';
import { loginUser } from './actions/public';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class LoginPage extends React.Component {
  state = {
    username: '',
    password: '',
    errors: {}
  }

  handleChange = (e) => {
    // clear errors when you type in the form
    this.setState({ errors: {}})
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    let { errors, isValid } = validateInput({ username, password } );
    this.setState({errors})
    if(isValid){
      this.setState({ errors: {} });
      this.props.loginUser(this.state)
      // redirect to authenticated user's page
        .then(res => this.props.history.push('/private'))
        .catch(err => {
          if (err.response){
            this.setState({ errors: err.response.data });
          }
        }
      )
    }
  }

  render(){
    const { errors } = this.state;
    return (
      <form className="container-fluid pt-3" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="lb-lg">Username</label>
          <input type="text" className={classnames('form-control', {'is-invalid': errors.username||errors.login})} name="username" value={this.state.username} onChange={this.handleChange}/>

          {errors.username  && (
            <div className="alert alert-danger" role="alert">
              {errors.username}
            </div>)}
        </div>
        <div className="form-group">
          <label className="lb-lg">Password</label>
          <input type="password" className={classnames('form-control', {'is-invalid': errors.password||errors.login})} name="password" value={this.state.password} onChange={this.handleChange} />

          {(errors.password || errors.login) && (
            <div className="alert alert-danger" role="alert">
              {errors.password||errors.login}
            </div>)}
        </div>

        <button type="submit" className="btn btn-primary mt-2">Login</button>
      </form>
    )
  }
};

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired
}

export default connect(null, { loginUser })(LoginPage);
