import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

class EventCreator extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      timeframes: ['Day', 'Week', 'Month'],
      currentTimeframe : 'Day',
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

  handleChange(e, index) {
    this.setState({
      value: index,
      currentTimeframe: this.state.timeframes[index],
    });
  }

  render() {
    const style = {
      marginLeft: 20,
    };
    return (
      <div className="eventCreator">
      <h1>Event Creator</h1>
      <Paper zDepth={1} style={{width: '50%'}}>
        <TextField hintText="Event name" style={style} underlineShow={false} onChange={this.eventChange} />
        <Divider />
        <TextField hintText="Event units" style={style} underlineShow={false} onChange={this.unitsChange} />
        <Divider />
        <TextField type="number" hintText="Goal/Limit" style={style} underlineShow={false} onChange={this.limitChange}/>
        <Divider />
      </Paper>
        <SelectField
          floatingLabelText="Choose Timeframe"
          value={this.state.value}
          onChange={this.handleChange}
        >
        {this.state.timeframes.map((timeframe, index) =>

          <MenuItem key={index} value={index} primaryText={timeframe} />
        )}

        </SelectField>
        <br />
        <br />
        <button
          onClick={this.props.createHabit.bind(this, this.state.event, this.state.units, this.state.limit, this.state.currentTimeframe) }>
          Create Habit
        </button>
        <hr />
      </div>
    )
  }
}

export default EventCreator;

        // <form name="eventCreation" className="creator">
        //   <label>Event Name:</label>
        //   <input type="text" onChange={this.eventChange} placeholder="Event Name" />
        //   <label>Event's Units:</label>
        //   <input type="text" onChange={this.unitsChange} placeholder="Units" />
        //   <label>Goal/Limit for Event</label>
        //   <input type="number" onChange={this.limitChange} placeholder="Goal/Limit" />
        // </form>