import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopBar from './TopBar.jsx';
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
      viewData: false,
      viewHabit: '',
    }
    this.getUserData = this.getUserData.bind(this);
    this.getHabitsInfo = this.getHabitsInfo.bind(this);
    this.logHabit = this.logHabit.bind(this);
    this.createHabit = this.createHabit.bind(this);
    this.selectHabit = this.selectHabit.bind(this);
  }


  componentDidMount() {
    axios.post('/login', {username: 'Stone', password: 'sandstone'})
      .then((res) => {
        console.log(res);
        this.getUserData();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getUserData() {
    let username = 'Stone';
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
    let username = 'Stone';
    let selected = habit; //using running as this is test data's habit
    this.setState({
      selectedHabit: selected,
    })
    axios.get(`/api/${username}/${selected}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          timeframe: res.data.timeframe,
          unit: res.data.unit,
          limit: res.data.limit,
          occurrences: res.data.occurrences,
          viewData: true,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  logHabit(event, time, quantity) {
    let occurrence = {
      username: this.state.username,
      habit: event,
      occurrence: {
        timestamp: time,
        value: quantity,
      },
    };
    console.log(occurrence);
    axios.post(`/api/${this.state.username}/log`, occurrence)
    .then((res) => {
      console.log(res.data);
      this.selectHabit(event);  // can re-factor to use occurrence object returned by the request
    })
    .catch((err) => {
      console.log(err);
    });
  }

  createHabit(name, unit, limit, timeframe) {
    let habit = {
      username: this.state.username,
      habit: name,
      limit: limit,
      unit: unit,
      timeframe: timeframe,
    };
    console.log(habit);
    axios.post(`/api/${this.state.username}/habit`, habit)
    .then((res) => {
      console.log(res);
      this.getUserData();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  selectHabit(name) {
    console.log(name);
    this.setState({
      viewHabit: name,
    });
    this.getHabitsInfo(name);
  }

  // componentWillMount() {
  //   this.lock = new Auth0Lock('9M0Ml5ere2b9X6ZybTl2XUQl5T4RHVS4', 'stoneandsand.auth0.com');
  // <Auth lock={this.lock} />
  // }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <TopBar />
        </MuiThemeProvider>
        <div className="main">
          <MuiThemeProvider>
            <EventCreator createHabit={this.createHabit} />
          </MuiThemeProvider>
          <MuiThemeProvider>
            <DataLogger habits={this.state.habits} getHabitsInfo={this.getHabitsInfo.bind(this)} logHabit={this.logHabit} />
          </MuiThemeProvider>
          <MuiThemeProvider>
            <EventSelector habits={this.state.habits} selectHabit={this.selectHabit}/>
          </MuiThemeProvider>
          <MuiThemeProvider>
          {this.state.viewData ?
            <MuiTable habit={this.state.viewHabit} timeframe={this.state.timeframe} unit={this.state.unit} limit={this.state.limit} occurrences={this.state.occurrences} /> : null}
          </MuiThemeProvider>
          {this.state.viewData ?
            <Chart timeframe={this.state.timeframe} unit={this.state.unit} limit={this.state.limit} occurrences={this.state.occurrences} /> : null}
        </div>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));