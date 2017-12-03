import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class EventSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
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
      <SelectField floatingLabelText="View Habit Data" value={this.state.value} onChange={this.handleChange}>
        {this.props.habits.map((habit, index) => <MenuItem key={index} value={index} primaryText={habit} />)}
      </SelectField>
    );
  }
}

EventSelector.propTypes = {
  selectHabit: PropTypes.func.isRequired,
  habits: PropTypes.array.isRequired,
};
