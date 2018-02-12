import React from "react";
import { connect } from 'react-redux'
import { vote } from './actions/public';
import PropTypes from 'prop-types';
import map from 'lodash/map'

class PollPageForm extends React.Component {
  state = {
    option: this.props.poll.options[0].name
  }

  handleChange = (e) => {
    this.setState({ option: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { _id } = this.props.poll;
    const { option } = this.state;
    console.log(this.state.option)
    this.props.vote({ _id, option})
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response))

  }

  render(){
    const { poll } = this.props
    const options = (
      map(poll.options, (option, index) =>
        <option value={option.name} key={index}>{option.name}</option>
      )
    )

    return (
      <div className="col-6">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">I'd like to vote for...</label>
            <select value={this.state.option} className="form-control" id="exampleFormControlSelect1" onChange={this.handleChange}>
              {options}
            </select>
          </div>
          <button className="btn btn-primary btn-block" type="submit">Vote</button>
          <button className="btn btn-primary btn-block" type="button">Share on Twitter</button>
        </form>
      </div>
    )
  }
};

export default connect(null, { vote })(PollPageForm);
