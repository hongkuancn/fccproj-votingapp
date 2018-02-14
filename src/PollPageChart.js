import React from "react";
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import map from 'lodash/map';

class PollPageChart extends React.Component {

  render(){
    let { poll } = this.props;
    console.log(poll)
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
            'rgba(255, 99, 132, 0.6)'
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

        <Bar
        	data={data}
          options={{
            title:{
              display: true,
              text: topic,
              fontSize: 30
            },
            legend:{
              display: false
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
