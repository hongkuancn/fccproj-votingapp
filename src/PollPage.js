import React from "react";
import PollPageForm from './PollPageForm'
import PollPageChart from './PollPageChart'

class PollPage extends React.Component {
  render(){
    const { poll } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
        <PollPageForm poll={poll}/>
        <PollPageChart poll={poll}/>
        </div>
      </div>
    )
  }
};

export default PollPage;
