import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MuiTable from './Table.jsx';
import Chart from './Chart.jsx';
import DataLogger from './DataLogger.jsx';
import Auth from './Auth/Auth.jsx';
import axios from 'axios';
import EventCreator from './EventCreator.jsx';
import EventSelector from './EventSelector.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      habits: [],
      username: 'Stone',
    }
    this.getUserData = this.getUserData.bind(this);
    this.getHabitsInfo = this.getHabitsInfo.bind(this);
    this.logEvent = this.logEvent.bind(this);
    this.createEvent = this.createEvent.bind(this);
  }


  componentDidMount() {
    this.getUserData();
    //this.getHabitsInfo();
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

  getHabitsInfo(habit) { //run this function when a habit is selected
    let username = 'george';
    let selected = habit || 'running'; //using running as this is test data's habit
    this.setState({
      selectedHabit: selected,
    })
    axios.get(`/api/${username}/${habit}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          timeframe: res.data.timeframe,
          unit: res.data.unit,
          limit: res.data.limit,
          occurrences: res.data.occurrences,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  logEvent(event, time, quantity) {
    let occurrence = {
      habit: event,
      timestamp: time,
      value: quantity,
    };
    console.log(occurrence);
    axios.post(`/api/${this.state.username}/log`, occurrence)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  createEvent(name, unit, limit, timeframe) {
    let event = {
      username: this.state.username,
      habit: name,
      limit: limit,
      unit: unit,
      timeframe: timeframe,
    };
    console.log(event);
    axios.post(`/api/${this.state.username}/habit`, event)
    .then((res) => {
      console.log(res);
      this.getUserData();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  componentWillMount() {
    this.lock = new Auth0Lock('9M0Ml5ere2b9X6ZybTl2XUQl5T4RHVS4', 'stoneandsand.auth0.com');
  }

  render() {
    return (
      <div className="main">

        <Auth lock={this.lock} />
        <MuiThemeProvider>
          <EventCreator createEvent={this.createEvent} />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <DataLogger habits={this.state.habits} getHabitsInfo={this.getHabitsInfo.bind(this)} logEvent={this.logEvent} />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <EventSelector habits={this.state.habits} />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <MuiTable timeframe={this.state.timeframe} unit={this.state.unit} limit={this.state.limit} occurrences={this.state.occurrences} />
        </MuiThemeProvider>
        <Chart timeframe={this.state.timeframe} unit={this.state.unit} limit={this.state.limit} occurrences={this.state.occurrences} />

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));