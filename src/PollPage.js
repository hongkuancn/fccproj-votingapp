import React from "react";
import PollPageForm from './PollPageForm'

class PollPage extends React.Component {
  render(){
    const { poll } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
        <PollPageForm poll={poll}/>
        </div>
      </div>
    )
  }
};

export default PollPage;
