import React from "react";
import { connect } from 'react-redux'
import { vote, addOption } from './actions/public';
import { deletePoll } from './actions/user';
import PropTypes from 'prop-types';
import map from 'lodash/map'
import PollPageChart from './PollPageChart';
import { Redirect } from 'react-router-dom'

class PollPageForm extends React.Component {
  state = {
    option: "Choose an option...",
    chosenOption: '',
    disable: false,
    redirect: false,
    newOption: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { _id } = this.props.poll;
    const { option } = this.state;
    //Option has a default value. Even user doesn't choose a option, it will pass to the child component. chosenOption is empty by default, so when it has a value, the value is the user's choice.
    this.setState({ chosenOption: option, disable: true, option: '' });
    this.props.vote({ _id, option})
      .catch(err => console.log(err.response))
  }

  handleClick = (id) => {
    this.props.deletePoll(id)
      .then(res => this.setState({ redirect: true }))
  }

  handleAddClick = (e) => {
    const { newOption } = this.state;
    const { _id } = this.props.poll;
    this.props.addOption({newOption, _id})
      .catch(err => console.log(err.response))
  }

  render(){
    //id is from redux, userid is from parent component
    const { poll, isAuthenticated, userid, id } = this.props;
    const { chosenOption, disable, redirect, option } = this.state;

    //after delete the poll, redirect to index page
    if (redirect) {
       return <Redirect to='/'/>;
     }

    const options = (
      map(poll.options, (option, index) =>
        <option value={option.name} key={index}>{option.name}</option>
      )
    );

    const newoptionform = (
      <div className="form-group form-inline">
        <label htmlFor="colFormLabelSm" className="ml-2">New Option</label>
        <div className="ml-5">
          <input type="text" name="newOption" value={this.state.newOption} className="form-control" placeholder="" onChange={this.handleChange}/>
        </div>
        <button className="btn btn-primary ml-auto" type="button" onClick={this.handleAddClick}>Add</button>
      </div>
    )
    //id is from redux, userid is from parent component
    const sameUser = userid === id;

    return (
      <React.Fragment>
        <div className="col-6">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">I'd like to vote for...</label>
              <select name="option" value={this.state.option} className="form-control" id="exampleFormControlSelect1" onChange={this.handleChange} disabled={disable}>
                <option value="Choose an option...">Choose an option...</option>
                {options}
                <option value="I want to add a custom option...">I want to add a custom option...</option>
              </select>
            </div>
            { option === "I want to add a custom option..." && newoptionform}

            <button className="btn btn-primary btn-block" type="submit" disabled={disable}>Vote</button>
            <button className="btn btn-primary btn-block" type="button">Share on Twitter</button>
            { isAuthenticated && sameUser && <button className="btn btn-danger btn-block" type="button" onClick={() => this.handleClick(poll._id)}>Delete the poll</button>}
          </form>
        </div>
        <PollPageChart poll={poll} chosenOption={chosenOption}/>
      </React.Fragment>
    )
  }
};

PollPageForm.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  vote: PropTypes.func.isRequired,
  addOption: PropTypes.func.isRequired,
  deletePoll: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    id: state.Auth.id
  }
}

export default connect(mapStateToProps, { vote, deletePoll, addOption })(PollPageForm);
