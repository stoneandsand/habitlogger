import React from 'react';
import Select from 'react-select';

class EventCreator extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      timeFrames: [{ label: 'day', value: 'day' }, { label: 'week', value: 'week' }, { label: 'month', value: 'month' }],
      selectedTimeFrame : 'day'
    }
    this.timeFrameChange = this.timeFrameChange.bind(this);
  }

  timeFrameChange(e) {
    this.setState({ currentEvent: `${e.label}` });
  }

  render() {
    return (
      <div>
        <Select
          name="form-field-name"
          label="day"
          options={this.state.timeFrames}
          onChange={this.logChange}
        />
        <p>Select time frame of data logging</p>
        <form name="eventCreation">
          <input type = "text" name="eventName" placeholder="Enter Event name" />
          <input type = "text" name="units" placeholder="Units used to measure event" />
          <input type = "number" name="limit" placeholder="Goal/Limit amount of Event" />
        </form>
      </div>
    )
  }
}

export default EventCreator;