import React from "react";
import { fetchList, fetchPoll } from './actions/public';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import find from 'lodash/find';
import PollPage from './PollPage';
import { Link } from 'react-router-dom';

class ListPage extends React.Component {
  state = {
    pollslist: [],
    chosenPoll: {},
    userid: ''
  }

  componentWillMount(){
    this.setState({ chosenPoll: {}})
  }

  componentDidMount(){
    this.props.fetchList().then(
      res => this.setState({ pollslist: res.data })
    )
  }

  handleClick = (id) => {
    const { pollslist } = this.state;
    // chosenPoll state can be set by munipulted the above pollslist directly. In that case I cannot get userid to decide whether to show delete button in PollPageForm. Besides, I don't have a good chance to set chosenPoll in redux store, which can rerender PollPageChart later.
    this.props.fetchPoll(id)
      .then(res => this.setState({ chosenPoll: res.data.doc, userid: res.data.id}))
  }

  render(){
    const { pollslist, chosenPoll } = this.state;

    const polls = (
      map(pollslist, poll =>   (
            <li key={poll._id} className="list-group-item list-group-item-action list-group-item-default lb-lg text-center" onClick={() => this.handleClick(poll._id)}>{poll.topic}</li>
          )
      )
    )

    const list = (
      <div className="container" id="listPage">

        <h1 className="list-header">Votex</h1>
        <p className="lead">Below are polls hosted by Votex.</p>
        <p className="lead">Select a poll to see the results and vote, or <Link to="/login">log in to make a new poll.</Link></p>

        <ul className="list-group">
          {polls}
        </ul>
      </div>
    )

    return (
      <React.Fragment>
      { chosenPoll.topic ? <PollPage poll={this.state.chosenPoll} userid={this.state.userid}/> : list }
      </React.Fragment>
    )
  }
};

ListPage.propTypes = {
  fetchList: PropTypes.func.isRequired,
  fetchPoll: PropTypes.func.isRequired,
}

export default connect(null, { fetchList, fetchPoll })(ListPage);
