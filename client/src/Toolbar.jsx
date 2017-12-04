import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import EventCreator from './EventCreator.jsx';
import EventSelector from './EventSelector.jsx';
import Heart from './HeartIcon.jsx';
import HeartPulse from './HeartPulseIcon.jsx';

const styles = {
  button: {
    margin: 12,
    backgroundColor: '#EC407A',
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

export default class AppToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      event: '',
      units: '',
      limit: '',
      value: 0,
      timeframes: ['Day', 'Week', 'Month'],
      currentTimeframe: 'Day',
    };

    this.toggleDialog = this.toggleDialog.bind(this);
    this.createHabit = this.createHabit.bind(this);
    this.updateHabit = this.updateHabit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDeadlineChange = this.handleDeadlineChange.bind(this);
  }

  toggleDialog() {
    const toggleStatus = !this.state.open;
    this.setState({ open: toggleStatus });
  }

  updateHabit(e) {
    const target = e.target;
    const name = target.name;

    this.setState({ [name]: target.value });
  }

  createHabit() {
    this.props.createHabit(this.state.event, this.state.units, this.state.limit, this.state.currentTimeframe);
    this.setState({
      event: '',
      units: '',
      limit: '',
      currentTimeframe: 'day',
      value: 0,
      deadline: '',
    });
    this.toggleDialog();
  }

  handleChange(e, index) {
    this.setState({
      value: index,
      currentTimeframe: this.state.timeframes[index],
    });
  }

  handleDeadlineChange(e, date) {
    this.setState({
      deadline: date,
    });
  }

  render() {
    const actions = [
      <FlatButton label="Save" primary={true} onClick={this.createHabit} />,
      <FlatButton label="Cancel" secondary={true} onClick={this.toggleDialog} />,
    ];
    return (
      <div className="app-toolbar">
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <Heart />
            <HeartPulse />
            <RaisedButton  label="Create a new habit" onClick={this.toggleDialog} />
            <Dialog
              title="Create a new habit"
              actions={actions}
              open={this.state.open}
              onRequestClose={this.toggleDialog}>
              <EventCreator
                event={this.state.event}
                units={this.state.units}
                limit={this.state.limit}
                updateHabit={this.updateHabit}
                value={this.state.value}
                timeframes={this.state.timeframes}
                handleChange={this.handleChange}
                handleDeadlineChange={this.handleDeadlineChange}
              />
            </Dialog>
          </ToolbarGroup>
          <ToolbarGroup>
            <EventSelector habits={this.props.habits} selectHabit={this.props.selectHabit} />
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton label="Delete Habit"  />
          </ToolbarGroup>

        </Toolbar>
      </div>
    );
  }
}

AppToolbar.propTypes = {
  createHabit: PropTypes.func.isRequired,
};
