import React from "react";
import { fetchMyList } from '../actions/user';
import { fetchPoll } from '../actions/public';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import PollPage from '../PollPage';
import { Link } from 'react-router-dom';

class Mypollspage extends React.Component {
  state = {
    pollslist: [],
    chosenPoll: {},
    userid: ''
  }

  componentWillMount(){
    this.setState({ chosenPoll: {}})
  }

  componentDidMount(){
    const { id } = this.props;
    this.props.fetchMyList(id).then(
      res => this.setState({ pollslist: res.data })
    )
  }

  handleClick = (id) => {
    this.props.fetchPoll(id)
      .then(res => this.setState({ chosenPoll: res.data.doc, userid: res.data.id }))
  }

  render(){
    const { chosenPoll } = this.state;

    const polls = (
      map(this.state.pollslist, poll =>   (
            <li key={poll._id} className="list-group-item list-group-item-action list-group-item-default lb-lg text-center" onClick={() => this.handleClick(poll._id)}>{poll.topic}</li>
          )
      )
    )

    const list = (
      <div className="container" id="listPage">

        <h1 className="list-header">Votex</h1>
        <p className="lead">Below are your polls.</p>
        <p className="lead">Select a poll to see the results and vote, or <Link to="/private/newpoll">make a new poll</Link>.</p>

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

Mypollspage.propTypes = {
  fetchMyList: PropTypes.func.isRequired,
  fetchPoll: PropTypes.func.isRequired,
  chosenPoll: PropTypes.object
}

function mapStateToProps(state){
  return {
    id: state.Auth.id
  }
}

export default connect(mapStateToProps, { fetchMyList, fetchPoll })(Mypollspage);
