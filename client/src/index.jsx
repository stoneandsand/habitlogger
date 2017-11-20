import React from 'react';
import ReactDOM from 'react-dom';
import MuiTable from './Table.jsx';
import Chart from './Chart.jsx';
import DataLogger from './DataLogger.jsx';
import Auth from './Auth/Auth.jsx';
import axios from 'axios';
import EventCreater from './EventCreater.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.logItem = this.logItem.bind(this);

    this.state = {
      habits: [],
    }
    this.getUserData = this.getUserData.bind(this);
    this.getHabitsInfo = this.getHabitsInfo.bind(this);
  }


  componentDidMount() {
    // this.getUserData();
    // this.getHabitsInfo();
  }

  getUserData() {
    let username = 'test123'
    axios.get(`/${username}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          habits: res.data,
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getHabitsInfo() {
    let username = 'george';
    let habit = 'running';
    axios.get(`/api/${username}/${habit}`)
      .then((res) => {
        console.log(res.data);
        this.setState({

        })
      })
      .catch((err) => {
        console.error(err);
      });
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
        <EventCreater />
        <DataLogger habits={this.state.habits} />
        <MuiTable />
        <Chart />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));