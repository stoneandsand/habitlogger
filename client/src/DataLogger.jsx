import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';

const styles = {
  customWidth: {
    width: 150,
  },
};

class DataLogger extends React.Component {
  constructor(props) {
    super(props);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      eventList: ['butterfly','coke', 'pegions'],
      currentEvent: 'N/A',
      currentUser: 'placeholder',
      eventTime: '',
      quantity: '',
    };
    this.logChange = this.logChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    // this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  logChange(e, index, value) {
    this.setState({
      currentEvent: e
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
        <SelectField
          floatingLabelText="Select Event"
          value=0
          onChange={this.logChange}
        >
          {this.state.eventList.map((event, index)=>{
            return <MenuItem value={index} primaryText=event />
          })}
        </SelectField>
        <label>Select Date: </label>

        <DatePicker hintText="Enter day of Event" container="inline" mode="landscape" onChange={(x, day) => this.handleDateChange(x,day)} />

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
