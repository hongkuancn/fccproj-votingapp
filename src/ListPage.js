import React from "react";
import { fetchList } from './actions/public';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import find from 'lodash/find';
import PollPage from './PollPage'

class ListPage extends React.Component {
  state = {
    pollslist: [],
    chosenPoll: {}
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
    const poll = find(pollslist, obj => {
        return obj._id === id
    })
    this.setState({ chosenPoll: poll })
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
        <p className="lead">Select a poll to see the results and vote, or sign-in to make a new poll.</p>

        <ul className="list-group">
          {polls}
        </ul>
      </div>
    )

    return (
      <React.Fragment>
      { chosenPoll.topic ? <PollPage poll={this.state.chosenPoll}/> : list }
      </React.Fragment>
    )
  }
};

ListPage.propTypes = {
  fetchList: PropTypes.func.isRequired
}

export default connect(null, { fetchList })(ListPage);
