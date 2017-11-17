import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table.jsx';
import Chart from './Chart.jsx';
import DataLogger from './DataLogger.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.logItem = this.logItem.bind(this);
  }

  // logItem(entry, habit) {
  //   axios.post('/api/' + {this.props.username} + '/log', {
  //     timestamp: new Date() , habit:'placeholder', unit:entry
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });   
  // }

  render() {
    return (
      <div>
        <DataLogger />
        <Table />
        <Chart />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));