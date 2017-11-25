import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
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
          iconElementRight={this.props.loggedIn ? <DefaultMenu logout={this.props.logout} /> : <LoginMenu />}
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
      <FlatButton style={{color: 'white'}} label="Signout" onClick={this.props.logout.bind(this)} />
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