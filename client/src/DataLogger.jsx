import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Clock from './ClockIcon.jsx';

class DataLogger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHabit: '',
      habitTime: '',
      quantity: '',
      value: 0,
      notes: '',
    };
    this.logChange = this.logChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.logHelper = this.logHelper.bind(this);
  }

  // used to have 'Select Habit' placeholder text in drop down menu on mount
  componentWillMount() {
    this.logChange();
  }

  logChange(e, index) {
    this.setState({
      currentHabit: this.props.habits[index],
      value: index,
    });
  }

  handleDateChange(e, date) {
    this.setState({ habitTime: date });
  }

  handleQuantityChange(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  handleNotesChange(e) {
    this.setState({
      notes: e.target.value,
    });
  }

  logHelper(e) {
   this.props.logHabit(e,
     this.state.currentHabit,
     this.state.habitTime,
     this.state.quantity,
     this.state.notes
    )
  }

  render() {
    return (
      <div className="data-logger">
        <Clock />
        <h3>Data Logger</h3>
        <SelectField floatingLabelText="Select Habit" value={this.state.value} onChange={this.logChange}>
          {this.props.habits.map((event, index) => {
            return <MenuItem key={index} value={index} primaryText={event} />;
          })}
        </SelectField>
        <DatePicker
          hintText="Enter the date"
          autoOk={true}
          container="inline"
          mode="landscape"
          value={this.state.habitTime}
          onChange={(x, day) => this.handleDateChange(x, day)}
        />
        <TextField floatingLabelText="Quantity" type="number" onChange={this.handleQuantityChange} />
        <TextField
          multiLine={true}
          rows={4}
          floatingLabelText="Enter your notes"
          value={this.state.notes}
          onChange={this.handleNotesChange}
        />
        <RaisedButton
          onClick={this.logHelper}
          label="Log Habit"
        />
      </div>
    );
  }
}

export default DataLogger;
