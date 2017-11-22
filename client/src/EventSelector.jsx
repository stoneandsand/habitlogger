import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class EventSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      selected: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value});
    this.setState({
      selected: this.props.habits[value],
    });
    this.props.selectHabit(this.props.habits[value]);
  }

  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="View Habit Data"
          value={this.state.value}
          onChange={this.handleChange}
        >
            {this.props.habits.map((habit, index) =>
              <MenuItem key={index} value={index}>{habit}</MenuItem>
            )}
        </SelectField>
        <p>Habit: {this.state.selected}</p>
      </div>
    )
  }

}

export default EventSelector;