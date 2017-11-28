import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class EventSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      currentHabit: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, index) {
    this.setState({
      currentHabit: this.props.habits[index],
      value: index,
    });
    this.props.selectHabit(this.props.habits[index]);
  }

  // bug on line 37: displayed data changes when data is logged but displayed habit data does not update
  render() {
    return (
      <div className="viewHabitData">
      <h1>Chart Selector</h1>
        <SelectField
          floatingLabelText="View Habit Data"
          value={this.state.value}
          onChange={this.handleChange}
        >
            {this.props.habits.map((habit, index) =>
              <MenuItem key={index} value={index} primaryText={habit} />
            )}
        </SelectField>
        <p>Displayed Habit Data: {this.props.currentHabit ? this.state.currentHabit : 'None'}</p>
      </div>
    )
  }
}

export default EventSelector;