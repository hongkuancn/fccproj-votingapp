import React from "react";
import validateInput from './validators/login';
import { loginUser } from './actions/public';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class LoginPage extends React.Component {
  state = {
    username: '',
    password: '',
    errors: {}
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { errors, isValid } = validateInput(this.state);
    if(isValid){
      this.setState({ errors: {} });
      this.props.loginUser(this.state)
        .then(res => this.props.history.push('/signup'))
        .catch(err => {
          if (err.response){
            this.setState({ errors: err.response.data.login });
          }
        }
      )
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

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    )
  }
};

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired
}

export default connect(null, { loginUser })(LoginPage);
