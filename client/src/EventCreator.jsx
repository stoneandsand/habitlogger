import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const style = {
  marginLeft: 20,
};

export default class EventCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: '',
      units: '',
      limit: '',
    };

    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextFieldChange(e) {
    const target = e.target;
    const name = target.name;

    this.setState({ [name]: target.value });
  }

  handleSubmit() {
    this.props.createHabit(this.state.event, this.state.units, this.state.limit);
    this.setState({
      event: '',
      units: '',
      limit: '',
    });
  }

  render() {
    return (
      <div className="eventCreator">
        <h1>Habit Creator</h1>
        <Paper zDepth={1} style={{ width: '50%' }}>
          <TextField
            name="event"
            value={this.state.event}
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
            value={this.state.units}
          />
          <Divider />
          <TextField
            name="limit"
            value={this.state.limit}
            type="number"
            hintText="Goal/Limit"
            style={style}
            underlineShow={false}
            onChange={this.handleTextFieldChange}
          />
          <Divider />
        </Paper>
        <br />
        <button onClick={this.handleSubmit}>Create Habit</button>
        <br />
      </div>
    );
  }
}

EventCreator.propTypes = {
  createHabit: PropTypes.func.isRequired,
};
