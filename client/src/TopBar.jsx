import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let defaultMenu;
    if (this.props.loggedIn) {
      defaultMenu = <FlatButton style={{ color: 'white' }} label="Signout" onClick={this.props.logout.bind(this)} />;
    } else {
      defaultMenu = null;
    }
    return (
      <div className="app-bar">
        <AppBar title="Habit Logger" iconElementRight={defaultMenu} showMenuIconButton={false} />
      </div>
    );
  }
}

TopBar.propTypes = {
  loggedIn: PropTypes.string,
  logout: PropTypes.func.isRequired,
};

TopBar.defaultProps = {
  loggedIn: null,
};

export default TopBar;
