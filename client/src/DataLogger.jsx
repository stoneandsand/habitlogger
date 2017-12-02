import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';


class DataLogger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHabit: '',
      habitTime: new Date(),
      quantity: '',
      value: 0,
    };
    this.logChange = this.logChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
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
    this.setState({habitTime: date});
  }

  handleQuantityChange(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  render() {
    return (
      <div className="dataLogger">
      <h1>Data Logger</h1>
        <SelectField
          floatingLabelText="Select Habit"
          value={this.state.value}
          onChange={this.logChange}
        >
          {this.props.habits.map((event, index)=>{
            return <MenuItem key={index} value={index} primaryText={event} />
          })}
        </SelectField>
        <br />
        <label>Click Date to Select Different Date: </label>
        <DatePicker
          autoOk={true}
          hintText="Enter day of Habit"
          container="inline"
          mode="landscape"
          value={this.state.habitTime}
          onChange={(x, day) => this.handleDateChange(x,day)} />
          <input type="number" onChange={this.handleQuantityChange} />
          <button onClick={this.props.logHabit.bind(this, this.state.currentHabit, this.state.habitTime, this.state.quantity)} >Log Habit</button>
        <hr />
      </div>
    )
  }
}

export default DataLogger;
