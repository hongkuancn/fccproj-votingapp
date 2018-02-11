import React from "react";
import { fetchList } from './actions/public';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import map from 'lodash/map';

class ListPage extends React.Component {
  state = {
    pollslist: []
  }

  componentDidMount(){
    this.props.fetchList().then(
      res => this.setState({ pollslist: res.data })
    )
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.history.push('/private')
  }

  render(){
    const list = (
      map(this.state.pollslist, user => {
        return map(user, poll =>  (
            <li key={poll._id} className="list-group-item list-group-item-action list-group-item-default lb-lg text-center" onClick={this.handleClick}>{poll.topic}</li>
          )
        )
      })
    )
  // render(){
  //   const list = (
  //     map(this.state.pollslist, user => {
  //       return map(user, poll =>  {
  //         console.log(poll);
  //         return (
  //           <li key={poll.id}>{poll.topic}</li>
  //         )
  //       }
  //       )
  //     })
  //   )

    return (
      <div className="container" id="listPage">
        <ul className="list-group">
          {list}
        </ul>
      </div>
    )
  }
};

ListPage.propTypes = {
  fetchList: PropTypes.func.isRequired
}

export default connect(null, { fetchList })(ListPage);
