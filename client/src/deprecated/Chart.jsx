import React from 'react';
import {Line} from 'react-chartjs-2';
import moment from 'moment';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels : this.compileEntryLabels(this.sortDates()),
      data : this.compileEntryValues(this.sortDates()),
      unit : this.props.unit,
    };
    this._options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          }
        }]
      }
    };
    this.compileEntryLabels = this.compileEntryLabels.bind(this);
    this.compileEntryValues = this.compileEntryValues.bind(this);
    this.setData = this.setData.bind(this);
    this.sortDates = this.sortDates.bind(this);
  }

  componentDidMount() {
    this.setData(this.state.labels, this.state.data, this.state.unit);
  }

  // set entries of chart data - currently set to 15 entries
  getLastXOccurrences(entries, x = 15) {
    if (entries.length > x) {
      return entries.slice(entries.length - x);
    } else {
      return entries;
    }
  }

  //Uses the sorted and filtered occurrence array that contains timestamp and value (X Axis)
  compileEntryLabels(entries) {
    entries = this.getLastXOccurrences(entries);

    return entries.map((entry) => {
      return this.props.timeframe + " of " + moment(entry.timestamp).format('MMM Do YYYY');
    });
  }

  // getting data to be displayed on chart (Y Axis)
  compileEntryValues(entries) {
    entries = this.getLastXOccurrences(entries);

    let arr = entries.map((entry) => {
      return entry.value;
    });
    console.log(arr);
    return arr;
  }

  // should be unnecessary as occurrences data is sorted by database/server now - need to refactor out
  sortDates () {
    return this.props.occurrences.sort((a,b)=>{
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });
  }

  // need to re-factor to get table to update/render properly
  setData (lab,dat,uni) {
    this.setState(  {data:
                     {
                       labels: lab,
                       datasets: [
                         {
                           label: uni,
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
                           data: dat,
                         }
                       ]
                     }});
  }

  render() {
    return (
      <div id="chart">
        <h3>{this.props.viewHabit} over the past 15 {this.props.timeframe}</h3>
        <Line data={this.state.data} options={this._options}/>
      </div>
    );
  }
}

export default Chart;
