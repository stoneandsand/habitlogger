import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopBar from './TopBar.jsx';
import MuiTable from './Table.jsx';
import Chart from './Chart.jsx';
import DataLogger from './DataLogger.jsx';
import Auth from './Auth/Auth.jsx';
import axios from 'axios';
import Login from './Login.jsx';
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
      loggedIn: false,
    }
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.getHabitsInfo = this.getHabitsInfo.bind(this);
    this.logHabit = this.logHabit.bind(this);
    this.createHabit = this.createHabit.bind(this);
    this.selectHabit = this.selectHabit.bind(this);
  }

  login(username, password) {
    console.log(`${username} and ${password} login`);
    axios.post('/login', {username: username, password: password})
      .then((res) => {
        this.setState({
          loggedIn: true,
        })
        this.getUserData();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  signup(username, password) {
    console.log(`${username} and ${password} signup`);
    axios.post('/signup', {username: username, password: password})
      .then((res) => {
        this.getUserData();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  logout() {
    console.log('logout button triggered');
    axios.get('/logout')
      .then((res) => {
        console.log(res);
        this.setState({
          loggedIn: false,
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    //Take out this code eventually as it's for keeping a user logged in for testing purposes
    axios.post('/login', {username: 'Stone', password: 'sandstone'})
      .then((res) => {
        console.log(res);
        this.setState({
          loggedIn: true,
        })
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
      <div className="container">
        <MuiThemeProvider>
          <TopBar logout={this.logout} loggedIn={this.state.loggedIn} />
        </MuiThemeProvider>
        <Login login={this.login} signup={this.signup} />
        {this.state.loggedIn ?
          <div className="main">

            <div className="row rowA">
              <MuiThemeProvider>
                <EventCreator createHabit={this.createHabit} />
              </MuiThemeProvider>
              <MuiThemeProvider>
                <DataLogger habits={this.state.habits} getHabitsInfo={this.getHabitsInfo.bind(this)} logHabit={this.logHabit} />
              </MuiThemeProvider>
              <MuiThemeProvider>
                <EventSelector habits={this.state.habits} selectHabit={this.selectHabit}/>
              </MuiThemeProvider>
            </div>
            <div className="row rowB">
              <MuiThemeProvider>
              {this.state.viewData ?
                <MuiTable habit={this.state.viewHabit} timeframe={this.state.timeframe} unit={this.state.unit} limit={this.state.limit} occurrences={this.state.occurrences} /> : null}
              </MuiThemeProvider>
            </div>
            <div className="row rowC">
              {this.state.viewData ?
                <Chart timeframe={this.state.timeframe} unit={this.state.unit} limit={this.state.limit} occurrences={this.state.occurrences} /> : null}
            </div>
          </div>
          : null}
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));