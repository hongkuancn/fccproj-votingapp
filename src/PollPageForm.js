import React from "react";
import { connect } from 'react-redux'
import { vote, addOption  } from './actions/public';
import { deletePoll } from './actions/user';
import PropTypes from 'prop-types';
import map from 'lodash/map'
import { Redirect } from 'react-router-dom'

class PollPageForm extends React.Component {
  state = {
    option: "Choose an option...",
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
    // check option value
    if(option !== "Choose an option..."){
      this.setState({ option });
      this.props.vote({ _id, option})
        .catch(err => alert(err.response.data.error))
    } else if (option === "Choose an option..."){
      alert("Please choose an option.")
    } else if ("I'd like to add a custom option..."){
      alert("Please add a custom option.")
    }
  }

  handleClick = (id) => {
    if(window.confirm('Do you really want to delete the poll?')){
      this.props.deletePoll(id)
      .then(res => this.setState({ redirect: true }))
    }
  }

  handleAddClick = (e) => {
    const { newOption } = this.state;
    const { _id } = this.props.poll;
    this.props.addOption({newOption, _id})
      .catch(err => alert(err.response.data.error))
  }

  handleShareClick = () => {
    const { poll } = this.props;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${poll.topic} from Votex | `);
    const href = `https://twitter.com/share?url=${url}&text=${text}`;
    window.open(href)
  }

  render(){
    //id is from redux, userid is from parent component
    const { poll, isAuthenticated, userid, id } = this.props;
    const { redirect, option } = this.state;

    if (redirect) {
       return <Redirect to='/private/#'/>;
     }

    const options = (
      map(poll.options, (option, index) =>
        <option value={option.name} key={index}>{option.name}</option>
      )
    );

    const newoptionform = (
      <div className="form-group form-inline">
        <label className="ml-2">New Option</label>
        <div className="ml-5">
          <input type="text" name="newOption" value={this.state.newOption} className="form-control" placeholder="" onChange={this.handleChange}/>
        </div>
        <button className="btn btn-primary ml-auto" type="button" onClick={this.handleAddClick}>Add</button>
      </div>
    )
    //id is from redux, userid is from parent component
    const sameUser = userid === id;

    return (
      <div className="col-5">
        <form onSubmit={this.handleSubmit} className="mt-5 ml-5 pt-5">
          <div className="form-group">
            <label className="lb-slg mb-2">I'd like to vote for...</label>
            <select name="option" value={this.state.option} className="form-control" id="exampleFormControlSelect1" onChange={this.handleChange}>
              <option value="Choose an option...">Choose an option...</option>
              {options}
              <option value="I'd like to add a custom option...">I'd like to add a custom option...</option>
            </select>
          </div>
          { option === "I'd like to add a custom option..." && newoptionform}

          <button className="btn btn-primary btn-block" type="submit">Vote</button>
          <button className="btn btn-info btn-block" type="button" onClick={this.handleShareClick}>Share on Twitter</button>
          { isAuthenticated && sameUser && <button className="btn btn-danger btn-block" type="button" onClick={() => this.handleClick(poll._id)}>Delete the poll</button>}
        </form>
      </div>
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
