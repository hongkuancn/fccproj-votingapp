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

  render(){
    const list = (
      map(this.state.pollslist, user => {
        return map(user, poll =>  (
            <tr key={poll.name}><td>{poll.topic}</td></tr>
          )
        )
      })
    )

    return (
      <div className="container">
        <table className="table">
          <tbody>
            {list}
          </tbody>
        </table>
      </div>
    )
  }
};

ListPage.propTypes = {
  fetchList: PropTypes.func.isRequired
}

export default connect(null, { fetchList })(ListPage);
