import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AppBar
          title="Habit Logger"
          iconElementRight={this.props.loggedIn ? <DefaultMenu logout={this.props.logout} /> : null}
          //LoginMenu was here in place of null - not used for now
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

// unused menu at top right of top bar when user is not signed in
// class LoginMenu extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div>
//         <FlatButton style={{color: 'white'}} label="Sign Up" />
//         <FlatButton style={{color: 'white'}} label="Login" />
//       </div>
//     );
//   }
// }

export default TopBar;