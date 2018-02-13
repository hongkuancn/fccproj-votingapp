import React from "react";
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';


class PollPageChart extends React.Component {

  render(){
    let { poll } = this.props;

    //rename the property
    const {newOption: option} = this.props;

    // option is not empty, add 1 to the option
    if(option.length > 0){
      for(let i=0; i<poll.options.length; i++){
        if (poll["options"][i]["name"] === option){
          poll["options"][i]["times"] = poll["options"][i]["times"] + 1;
        }
      }
    } else {
      // if not, keep poll the same
    }

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
    for(let i=0; i<poll.options.length; i++){
      if (poll["options"][i]["name"]){
        data.labels.push(poll["options"][i]["name"]);
      }
    }
    //set votes of each option
    for(let i=0; i<poll.options.length; i++){
      if (poll["options"][i]["name"]){
        data.datasets[0].data.push(poll["options"][i]["times"]);
      }
    }
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

export default PollPageChart;
