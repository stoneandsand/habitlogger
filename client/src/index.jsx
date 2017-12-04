import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopBar from './TopBar.jsx';
import DataLogger from './DataLogger.jsx';
import axios from 'axios';
import Login from './Login.jsx';
import Chart from './Charts/Chart.jsx';
import EventCreator from './EventCreator.jsx';
import EventSelector from './EventSelector.jsx';
import LoggerCalendar from './LoggerCalendar.jsx';
import Toolbar from './Toolbar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      habits: [],
      username: null,
      viewData: false,
      viewHabit: '',
      loggedIn: false,
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.getHabitsInfo = this.getHabitsInfo.bind(this);
    this.logHabit = this.logHabit.bind(this);
    this.createHabit = this.createHabit.bind(this);
    this.selectHabit = this.selectHabit.bind(this);
    this.checkFields = this.checkFields.bind(this);
  }

  componentWillMount() {
    axios
      .get('/sessionCheck')
      .then(res => {
        this.setState({
          username: res.data.user,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  login(username, password) {
    axios
      .post('/login', { username: username, password: password })
      .then(res => {
        console.log(res.data);
        if (res.data) {
          this.setState({ username: res.data });
          this.getUserData();
        } else {
          alert('Incorrect Credentials');
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  signup(username, password) {
    if (username.length < 4 || password.length < 4) {
      alert('Username and password must be at least 4 characters.');
    } else {
      axios
        .post('/signup', { username: username, password: password })
        .then(res => {
          if (res.data) {
            this.setState({
              username: res.data,
            });
          } else {
            alert('Failed to sign up. Username possibly taken.');
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  logout() {
    axios
      .get('/logout')
      .then(res => {
        this.setState({
          habits: [],
          username: null,
          viewData: false,
          viewHabit: '',
          loggedIn: false,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  // retrieve user's habits and set as state for other components
  getUserData() {
    let username = this.state.username;
    axios
      .get(`/api/${username}`)
      .then(res => {
        this.setState({
          habits: res.data,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  // retrieve occurrences information for specific habit of user
  getHabitsInfo(habit) {
    let username = this.state.username;
    this.setState({
      selectedHabit: habit,
    });
    axios
      .get(`/api/${username}/${habit}`)
      .then(res => {
        this.setState({
          timeframe: res.data.timeframe,
          unit: res.data.unit,
          limit: res.data.limit,
          occurrences: res.data.occurrences,
          viewData: true,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  // used in dataLogger to record occurrence in database (POST)
  logHabit(event, time, quantity, notes) {
    let fieldsFilled = this.checkFields(event, quantity);
    if (fieldsFilled) {
      let occurrence = {
        username: this.state.username,
        habit: event,
        occurrence: {
          timestamp: time,
          value: quantity,
        },
        notes: notes,
      };
      axios
        .post(`/api/${this.state.username}/log`, occurrence)
        .then(res => {
          this.selectHabit(event);
          // can re-factor to use occurrence object returned by the request
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      alert('Please fill all fields when logging an event.');
    }
  }

  // used to ensure input fields are filled in for data logger
  checkFields(event, quantity) {
    return event && quantity.length > 0;
  }

  //used by EventCreator to add habits to user's list of habits in database
  createHabit(name, unit, limit, timeframe, deadline) {
    let habit = {
      username: this.state.username,
      habit: name,
      limit: limit,
      unit: unit,
      timeframe: timeframe,
      deadline: deadline,
    };
    axios
      .post(`/api/${this.state.username}/habit`, habit)
      .then(res => {
        this.getUserData();
      })
      .catch(err => {
        console.error(err);
      });
  }

  // select habit to be displayed in chart and table
  selectHabit(habitName) {
    this.setState({
      viewHabit: habitName,
    });
    this.getHabitsInfo(habitName);
  }

  render() {
    console.log(this.state);
    let initialPage;
    if (!this.state.username) {
      initialPage = <Login login={this.login} signup={this.signup} />;
    } else {
      initialPage = (<div>
        <div className="content content-subgrid">
          <Toolbar
            habits={this.state.habits}
            getHabitsInfo={this.getHabitsInfo}
            createHabit={this.createHabit}
            selectHabit={this.selectHabit}
          />
            <LoggerCalendar />
        </div>
        <div className="top-row__container">
          <DataLogger habits={this.state.habits} getHabitsInfo={this.getHabitsInfo} logHabit={this.logHabit} />
          <Chart />
        </div>
      </div>);
    }
    return (
      <div className="wrapper">
        <MuiThemeProvider>
          <TopBar logout={this.logout} loggedIn={this.state.username} />
          {initialPage}
        </MuiThemeProvider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
