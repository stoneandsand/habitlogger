import React from 'react';
import Select from 'react-select';
import Datepicker from 'material-ui/DatePicker';

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
        <DatePicker hintText="Enter day of Event" container="inline" mode="landscape" onChange={this.handleDateChange(null,date)} />
        <form name="logInput">
          <input type="number" name="units" />
          <button>Enter unit for Event</button>
        </form>
      </div>
    );
  }
}

export default DataLogger;
