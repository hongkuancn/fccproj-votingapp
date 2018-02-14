import React from "react";
import PollPageForm from './PollPageForm';
import PollPageChart from './PollPageChart';

class PollPage extends React.Component {
  render(){
    const { poll, userid } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <PollPageForm poll={poll} userid={userid}/>
          <PollPageChart />
        </div>
      </div>
    )
  }
};

export default PollPage;
