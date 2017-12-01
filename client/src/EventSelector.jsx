import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class EventSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      currentHabit: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, index) {
    this.setState({
      currentHabit: this.props.habits[index],
      value: index,
    });

    this.props.selectHabit(this.props.habits[index]);
  }

  render() {
    return (
      <div className="viewHabitData">
        <h1>Chart Selector</h1>
        <SelectField floatingLabelText="View Habit Data" value={this.state.value} onChange={this.handleChange}>
          {this.props.habits.map((habit, index) => <MenuItem key={index} value={index} primaryText={habit} />)}
        </SelectField>
        <p>Displayed Habit Data: {this.state.currentHabit ? this.state.currentHabit : 'None'}</p>
      </div>
    );
  }
}

EventSelector.propTypes = {
  selectHabit: PropTypes.func.isRequired,
  habits: PropTypes.array.isRequired,
};
