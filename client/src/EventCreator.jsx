import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

const style = {
  marginLeft: 20,
};

export default class EventCreator extends React.Component {
  constructor(props) {
    super(props);

    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleTimeFrame = this.handleTimeFrame.bind(this);
    this.handleDeadline = this.handleDeadline.bind(this);
  }

  handleTextFieldChange(e) {
    this.props.updateHabit(e);
  }

  handleTimeFrame(e, index) {
    this.props.handleChange(e, index);
  }

  handleDeadline(e, date) {
    this.props.handleDeadlineChange(e, date);
  }

  render() {
    return (
      <div className="eventCreator">
        <TextField
          name="event"
          value={this.props.event}
          hintText="Habit name"
          style={style}
          underlineShow={false}
          onChange={this.handleTextFieldChange}
        />
        <Divider />
        <TextField
          name="units"
          hintText="Habit units"
          style={style}
          underlineShow={false}
          onChange={this.handleTextFieldChange}
          value={this.props.units}
        />
        <Divider />
        <TextField
          name="limit"
          value={this.props.limit}
          type="number"
          hintText="Goal/Limit"
          style={style}
          underlineShow={false}
          onChange={this.handleTextFieldChange}
        />
        <Divider />
        <SelectField floatingLabelText="Choose Timeframe" value={this.props.value} onChange={this.handleTimeFrame}>
          {this.props.timeframes.map((timeframe, index) => (
            <MenuItem key={index} value={index} primaryText={timeframe} />
          ))}
        </SelectField>
        <DatePicker
          autoOk={true}
          floatingLabelText="Deadline"
          defaultDate={new Date()}
          disableYearSelection={false}
          onChange={this.handleDeadline}
        />
      </div>
    );
  }
}

EventCreator.propTypes = {
  event: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
  limit: PropTypes.string.isRequired,
  updateHabit: PropTypes.func.isRequired,
  handleDeadlineChange: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
