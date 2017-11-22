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
      habitList: ['butterfly','coke', 'pegions'],
      currentHabit: 'N/A',
      currentUser: 'placeholder',
      eventTime: '',
      quantity: '',
    };
    this.logChange = this.logChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  logChange(e, index, value) {
    this.setState({
      currentEvent: this.state.habitList[value]
    });
  }

  handleDateChange(e, date) {
    console.log('date changed to ' + date)
    let momentDate = moment(date).format('MMM Do YYYY');
    this.setState({habitTime: momentDate});
  }

  handleQuantityChange(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  render() {
    return (
      <div>
      <h4>Data Logger</h4>
        <SelectField
          floatingLabelText="Select Habit"
          value={0}
          onChange={this.logChange}
        >
          {this.state.habitList.map((event, index)=>{
            return <MenuItem value={index} primaryText={event} />
          })}
        </SelectField>
        <label>Select Date: </label>

        <DatePicker hintText="Enter day of Habit" container="inline" mode="landscape" onChange={(x, day) => this.handleDateChange(x,day)} />

        <p>
          Selected Habit: {this.state.currentHabit}<br/>
          Selected Date: {this.state.eventTime}
        </p>
          <input type="number" onChange={this.handleQuantityChange} />
          <button onClick={this.props.logHabit.bind(this, this.state.currentHabit, this.state.habitTime, this.state.quantity)} >Log Habit</button>
        <hr />
      </div>
    )
  }
}

export default DataLogger;
