import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
    }
    this.testToggle = this.testToggle.bind(this);
  }

  testToggle() {
    this.setState({
      loggedIn: !this.state.loggedIn
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.testToggle}>Test Toggle</button>
        <AppBar
          title="Habit Logger"
          iconElementRight={this.state.loggedIn ? <DefaultMenu /> : <LoginMenu />}
          showMenuIconButton={false}
        />
      </div>
    )
  }
}

class DefaultMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FlatButton style={{color: 'white'}} label="Signout" />
    );
  }
}


class LoginMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <FlatButton style={{color: 'white'}} label="Sign Up" />
        <FlatButton style={{color: 'white'}} label="Login" />
      </div>
    );
  }
}


export default TopBar;