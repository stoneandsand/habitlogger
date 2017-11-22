import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class EventSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    }
  }

  handleChange(event, index, value) {
     this.setState({value: value});
  }

  render() {
    return (
      <SelectField>
          {this.props.habits.map((habit, index) =>
            <MenuItem value={index}>{habit}</MenuItem>
          )}
      </SelectField>
    )
  }

}

export default EventSelector;