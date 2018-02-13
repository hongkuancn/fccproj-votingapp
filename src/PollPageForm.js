import React from "react";
import { connect } from 'react-redux'
import { vote } from './actions/public';
import { deletePoll } from './actions/user';
import PropTypes from 'prop-types';
import map from 'lodash/map'
import PollPageChart from './PollPageChart';
import { Redirect } from 'react-router-dom'

class PollPageForm extends React.Component {
  state = {
    option: this.props.poll.options[0].name,
    newOption: '',
    disable: false,
    redirect: false
  }

  handleChange = (e) => {
    this.setState({ option: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { _id } = this.props.poll;
    const { option } = this.state;
    //Option has a default value. Even user doesn't choose a option, it will pass to the child component. newOption is empty by default, so when it has a value, the value is the user's choice.
    this.setState({ newOption: option, disable: true, option: '' });
    this.props.vote({ _id, option})
      .catch(err => console.log(err.response))
  }

  handleClick = (id) => {
    this.props.deletePoll(id)
      .then(res => this.setState({ redirect: true }))
  }

  render(){
    const { poll, isAuthenticated } = this.props;
    const { newOption, disable, redirect } = this.state;

    //after delete the poll, redirect to index page
    if (redirect) {
       return <Redirect to='/'/>;
     }

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
              <select value={this.state.option} className="form-control" id="exampleFormControlSelect1" onChange={this.handleChange} disabled={disable}>
                {options}
              </select>
            </div>

            <button className="btn btn-primary btn-block" type="submit" disabled={disable}>Vote</button>
            <button className="btn btn-primary btn-block" type="button">Share on Twitter</button>
            { isAuthenticated && <button className="btn btn-danger btn-block" type="button" onClick={() => this.handleClick(poll._id)}>Delete the poll</button>}
          </form>
        </div>
        <PollPageChart poll={poll} newOption={newOption}/>
      </React.Fragment>
    )
  }
};

PollPageForm.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  vote: PropTypes.func.isRequired,
  deletePoll: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    isAuthenticated: state.Auth.isAuthenticated
  }
}

export default connect(mapStateToProps, { vote, deletePoll })(PollPageForm);
