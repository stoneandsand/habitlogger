import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  render() {
    return (
      <MuiThemeProvider>
          <div>
          <TextField
            hintText="Enter Username"
            floatingLabelText="Username"
            onChange = {(event, user) => this.setState({username: user })}
           />
          <br />
          <TextField
            type="password"
            hintText="Enter Password"
            floatingLabelText="Password"
            onChange = {(event, pass) => this.setState({password: pass })}
           />
           <br />
          <RaisedButton label="LOGIN" onClick={this.login} />
          <br />
          <RaisedButton label="SIGNUP" onClick={this.signup} />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Login;