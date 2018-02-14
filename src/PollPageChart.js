import React from "react";
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import map from 'lodash/map';

class PollPageChart extends React.Component {

  render(){
    let { poll } = this.props;
    //set an object which contains the data of the chart
    let data = {
      labels: [],
      datasets:[
        {
          label:'Option',
          data:[],
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            "rgba(62, 149, 205, 0.9)",
            "rgba(142, 94, 162, 0.9)",
            "rgba(60, 186, 159, 0.9)",
            "rgba(232, 195, 184, 0.9)",
            "rgba(196, 88, 81, 0.9)",
            "rgba(217, 83, 79, 0.9)",
            "rgba(249, 249, 249, 0.9)",
            "rgba(91, 192, 222, 0.9)",
            "rgba(92, 184, 92, 0.9)",
            "rgba(65, 138, 201, 0.9)",
            'rgba(255, 99, 132, 0.3)',
            'rgba(54, 162, 235, 0.3)',
            'rgba(255, 206, 86, 0.3)'
          ]
        }
      ]
    }
    //set labels of chart
    map(poll.options, option => data.labels.push(option["name"]))
    //set votes of each option
    map(poll.options, option => data.datasets[0].data.push(option["times"]))
    // set title of the poll
    let { topic } = poll;

    return (
      <div className="col-6">

        <Pie
        	data={data}
          options={{
            title:{
              display: true,
              text: topic,
              fontSize: 30
            },
            legend:{
              display: true,
              position: "bottom"
            }
          }}
        />
      </div>
    )
  }
};

PollPageChart.propTypes = {
  poll: PropTypes.object
}

function mapStateToProps(state){
  return {
    poll: state.Poll.poll
  }
}

export default connect(mapStateToProps, {})(PollPageChart);
