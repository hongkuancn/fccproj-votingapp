import React from "react";
import newpollValidation from '../validators/newpoll';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { addNewPoll } from '../actions/user';

class NewpollPage extends React.Component {
  state = {
    topic: '',
    options: ``,
    errors: {}
  }

  handleChange = (e) => {
    this.setState({ errors: {}})
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { topic, options } = this.state;
    const { errors, isValid } = newpollValidation({ topic, options });
    this.setState({ errors })
    if(isValid){
      const opt = options.split(/[\r\n]+/);
      const filteropt = opt.filter(item => item !== '');
      const convertopt = filteropt.map(item => {
          return { name: item }
      })
      console.log(convertopt)
      this.props.addNewPoll({ topic, options: convertopt })
        .then(res => this.props.history.push('/private/mypolls'))
        .catch(err => this.setState({ errors: err.response.data }))
    }
  }

  render(){
    console.log(this.state.errors);
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="container-fluid pt-3">
        <div className="form-group">
          <label className="lb-lg">New Poll</label>
          <input type="text" className={classnames('form-control', {'is-invalid': errors.topic})} name="topic" value={this.state.topic} onChange={this.handleChange} placeholder="Write a new poll right now!"/>

          {errors.topic  && (
            <div className="alert alert-danger" role="alert">
              {errors.topic}
            </div>
          )}
        </div>
        <div className="form-group">
          <label className="lb-lg">Options (seperated by line):</label>
          <textarea value={this.state.options} className={classnames('form-control', {'is-invalid': errors.options})} name="options" onChange={this.handleChange} />

          {errors.options  && (
            <div className="alert alert-danger" role="alert">
              {errors.options}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
};

NewpollPage.propTypes = {
  addNewPoll: PropTypes.func.isRequired
}

export default connect(null, { addNewPoll })(NewpollPage);
