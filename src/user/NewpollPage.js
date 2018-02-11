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
      const opt = options.split(/\r|\n/);
      const convertopt = opt.map(item => {
        return { name: item }
      })
      this.props.addNewPoll({ topic, options: convertopt })
        .then(res => this.history.push('/private'))
        .catch(err => this.setState({ errors: err.response.data }))
    }
  }

  render(){
    console.log(this.state.errors);
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="container-fluid">
        <div className="form-group">
          <label className="lb-lg">New Poll</label>
          <input type="text" className={classnames('form-control', {'is-invalid': errors.topic})} name="topic" value={this.state.topic} onChange={this.handleChange} placeholder="Which movie to watch on Friday?"/>

          {errors.topic  && (
            <div className="alert alert-danger" role="alert">
              {errors.topic}
            </div>)}
        </div>
        <div className="form-group">
          <label className="lb-lg">Options</label>
          <textarea value={this.state.options} className={classnames('form-control', {'is-invalid': errors.options})} name="options" onChange={this.handleChange} />

          {errors.options  && (
            <div className="alert alert-danger" role="alert">
              {errors.options}
            </div>)}
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
