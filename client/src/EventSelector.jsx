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

  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="View Habit Data"
          value={this.state.value}
          onChange={this.handleChange}
        >
            {this.props.habits.map((habit, index) =>
              <MenuItem key={index} value={index} primaryText={habit} />
            )}
        </SelectField>
        <p>Habit: {this.state.currentHabit}</p>
      </div>
    )
  }

}

export default EventSelector;