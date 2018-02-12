import React from "react";

class PollPageChart extends React.Component {
  render(){
    const { poll } = this.props;
    console.log(poll.options)
    return (
      <div className="col-6">
        content
      </div>
    )
  }
};

export default PollPageChart;
