import React from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this._options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
    this.state = {
      data:
        {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Hours Played',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [4, 8, 2, 6, 7, 1, 3]
            }
          ]
        },
    }
  }

  render() {
    return (
      <div id="chart">
        <h3>Video Games Past Week</h3>
        <Line data={this.state.data} options={this._options} />
      </div>
    )
  }
}

export default Chart;