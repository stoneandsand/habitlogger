import React from 'react';
import Select from 'react-select';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';

class DataLogger extends React.Component {
  constructor(props) {
    super(props);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      eventList: [{ label: 'butterfly' }, { label: 'coke' }, { label: 'pegions' }],
      currentEvent: 'N/A',
      currentUser: 'placeholder',
      eventTime: '',
      quantity: '',
    };
    this.logChange = this.logChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  logChange(e) {
    this.setState({
      currentEvent: `${e.label}`
    });
  }

  handleDateChange(e, date) {
    console.log('date changed to ' + date)
    let momentDate = moment(date).format('MMM Do YYYY');
    this.setState({eventTime: momentDate});
  }

  handleQuantityChange(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  // handleSubmit(e) {
  // e.preventDefault();
  // var dataLog = document.forms.logInput;

  // let num = dataLog.units.value
  // let user = this.state.currentUser
  // let event = this.state.currentEvent

  // var logItem = {}
  // this.props.logItem(dataLog, 'placeholder');
  // onClick = {this.handleSubmit}
  // }

  render() {
    return (
      <div>
      <h4>Data Logger</h4>
        <label>Select Event:</label>
        <Select
          value={this.state.currentEvent}
          options={this.state.eventList}
          onChange={this.logChange}
          className="dropdown"
        />

        <label>Select Date: </label>
        <MuiThemeProvider>
        <DatePicker hintText="Enter day of Event" container="inline" mode="landscape" onChange={(x, day) => this.handleDateChange(x,day)} />
        </MuiThemeProvider>
        <p>
          Selected Event: {this.state.currentEvent}<br/>
          Selected Date: {this.state.eventTime}
        </p>
          <input type="number" onChange={this.handleQuantityChange} />
          <button onClick={this.props.logEvent.bind(this, this.state.currentEvent, this.state.eventTime, this.state.quantity)} >Log Event</button>
        <hr />
      </div>
    )
  }
}

export default DataLogger;
