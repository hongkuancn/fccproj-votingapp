import React from "react";
import { connect } from 'react-redux'
import { vote } from './actions/public';
import PropTypes from 'prop-types';
import map from 'lodash/map'
import PollPageChart from './PollPageChart'

class PollPageForm extends React.Component {
  state = {
    option: this.props.poll.options[0].name,
    newOption: '',
    disable: false
  }

  componentDidMount(){
    alert('You have only one chance. Please think carefully before you vote.')
  }

  handleChange = (e) => {
    this.setState({ option: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { _id } = this.props.poll;
    const { option } = this.state;
    //Option has a default value. Even user doesn't choose a option, it will pass to the child component. newOption is empty by default, so when it has a value, the value is the user's choice.
    this.setState({ newOption: option, disable: true });
    alert("Vote successfully! Thank you!")
    this.props.vote({ _id, option})
      .then(res => console.log(res))
      .catch(err => console.log(err.response))
  }

  render(){
    console.log("form rerender")

    const { poll } = this.props;
    const { newOption, disable } = this.state;
    const options = (
      map(poll.options, (option, index) =>
        <option value={option.name} key={index}>{option.name}</option>
      )
    )

    return (
      <React.Fragment>
        <div className="col-6">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">I'd like to vote for...</label>
              <select value={this.state.option} className="form-control" id="exampleFormControlSelect1" onChange={this.handleChange}>
                {options}
              </select>
            </div>
            <button className="btn btn-primary btn-block" type="submit" disabled={disable}>Vote</button>
            <button className="btn btn-primary btn-block" type="button">Share on Twitter</button>
          </form>
        </div>
        <PollPageChart poll={poll} newOption={newOption}/>
      </React.Fragment>
    )
  }
};

export default connect(null, { vote })(PollPageForm);
