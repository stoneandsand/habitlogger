import React from 'react';
import Select from 'react-select';

class EventCreator extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      timeFrames: [{ label: 'day', value: 'day' }, { label: 'week', value: 'week' }, { label: 'month', value: 'month' }],
      selectedTimeframe : 'day',
      event: '',
      units: '',
      limit: '',
    }
    this.timeFrameChange = this.timeFrameChange.bind(this);
    this.eventChange = this.eventChange.bind(this);
    this.unitsChange = this.unitsChange.bind(this);
    this.limitChange = this.limitChange.bind(this);
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
        <label>Timeframe: </label>
        <Select
          name="form-field-name"
          label="day"
          options={this.state.timeFrames}
          onChange={this.logChange}
          className="dropdown"
        />
        <p>Select timeframe of data logging</p>
        <button
          onClick={this.props.createEvent.bind(this, this.state.event, this.state.units, this.state.limit, this.state.selectedTimeframe) }>
          Create Event
        </button>
        <hr />
      </div>
    )
  }
}

export default EventCreator;