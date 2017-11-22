import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class EventCreator extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      currentTimeframe : '',
      event: '',
      units: '',
      limit: '',
      value: 0,
    }
    this.timeFrameChange = this.timeFrameChange.bind(this);
    this.eventChange = this.eventChange.bind(this);
    this.unitsChange = this.unitsChange.bind(this);
    this.limitChange = this.limitChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  timeFrameChange(e) {
    this.setState({ currentEvent: `${e.label}` });
  }

  eventChange(e) {
    this.setState({
      event: e.target.value,
    });
  }

  unitsChange(e) {
    this.setState({
      units: e.target.value,
    });
  }

  limitChange(e) {
    this.setState({
      limit: e.target.value,
    });
  }

  handleChange(e, index, value) {
    this.setState({
      value: index,
      currentTimeframe: e.target.value,
    });
    this.setState({value});
  }

  render() {
    return (
      <div>
      <h4>Event Creator</h4>
        <form name="eventCreation" className="creator">
          <label>Event Name:</label>
          <input type="text" onChange={this.eventChange} placeholder="Event Name" />
          <label>Event's Units:</label>
          <input type="text" onChange={this.unitsChange} placeholder="Units" />
          <label>Goal/Limit for Event</label>
          <input type="number" onChange={this.limitChange} placeholder="Goal/Limit" />
        </form>
        <label>Select Timeframe: </label>
        <br/>
        <SelectField
          floatingLabelText="Choose Timeframe"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={1} primaryText="Day" />
          <MenuItem value={2} primaryText="Week" />
          <MenuItem value={3} primaryText="Month" />
        </SelectField>
        <p>
        Current Timeframe: {this.state.currentTimeframe}
        </p>
        <button
          onClick={this.props.createHabit.bind(this, this.state.event, this.state.units, this.state.limit, this.state.selectedTimeframe) }>
          Create Habit
        </button>
        <hr />
      </div>
    )
  }
}

export default EventCreator;