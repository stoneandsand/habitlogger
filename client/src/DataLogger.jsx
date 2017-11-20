import React from 'react';
import Select from 'react-select';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class DataLogger extends React.Component {
  constructor(props) {
    super(props);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      eventList: [{ label: 'butterfly' }, { label: 'coke' }, { label: 'pegions' }],
      currentEvent: 'N/A',
      currentUser: 'placeholder',
      eventTime: new Date()
    };
    this.logChange = this.logChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  logChange(e) {
    this.setState({ currentEvent: `${e.label}` });
  }

  handleDateChange(e,date) {
    this.setState({eventTime:date})
    console.log('date changed to ' + date)
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
        <Select
          name="form-field-name"
          label="butterfly"
          options={this.state.eventList}
          onChange={this.logChange}
        />
        <p>Selected Event : {this.state.currentEvent}</p>
        <hr />

        <MuiThemeProvider>
        <DatePicker hintText="Enter day of Event" container="inline" mode="landscape" onChange={(x, day) => this.handleDateChange(x,day)} />
        </MuiThemeProvider>

        <form name="logInput">
          <input type="number" name="units" />
          <button>Enter unit for Event</button>
        </form>
      </div>
    )
  }
}

export default DataLogger;
