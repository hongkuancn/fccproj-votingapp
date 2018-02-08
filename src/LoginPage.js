import React from "react";
import validateInput from './validators/login';

class LoginPage extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateInput(this.state);
    console.log(isValid);
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

export default LoginPage;
