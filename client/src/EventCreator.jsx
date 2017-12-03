import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

const style = {
  marginLeft: 20,
};

export default class EventCreator extends React.Component {
  constructor(props) {
    super(props);

    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
  }

  handleTextFieldChange(e) {
    this.props.updateHabit(e);
  }

  render() {
    return (
      <div className="eventCreator">
        <h1>Habit Creator</h1>
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
      </div>
    );
  }
}

EventCreator.propTypes = {
  event: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
  limit: PropTypes.string.isRequired,
  updateHabit: PropTypes.func.isRequired,
};
