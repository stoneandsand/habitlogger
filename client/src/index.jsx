import React from 'react';
import ReactDOM from 'react-dom';
import MuiTable from './Table.jsx';
import Chart from './Chart.jsx';
import DataLogger from './DataLogger.jsx';
import Auth from './Auth/Auth.jsx';
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
  componentWillMount() {
    this.lock = new Auth0Lock('9M0Ml5ere2b9X6ZybTl2XUQl5T4RHVS4', 'stoneandsand.auth0.com');
  }

  render() {
    return (
      <div>
        <Auth lock={this.lock} />
        <DataLogger />
        <MuiTable />
        <Chart />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));