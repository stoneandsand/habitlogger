import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import EventCreator from './EventCreator.jsx';

export default class AppToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      event: '',
      units: '',
      limit: '',
    };

    this.toggleDialog = this.toggleDialog.bind(this);
    this.createHabit = this.createHabit.bind(this);
    this.updateHabit = this.updateHabit.bind(this);
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
    this.props.createHabit(this.state.event, this.state.units, this.state.limit);
    this.setState({
      event: '',
      units: '',
      limit: '',
    });
    this.toggleDialog();
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
            <RaisedButton label="Create a new habit" onClick={this.toggleDialog} />
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
              />
            </Dialog>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

AppToolbar.propTypes = {
  createHabit: PropTypes.func.isRequired,
};
