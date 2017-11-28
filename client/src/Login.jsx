import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUsername: '',
      loginPassword: '',
      signupUsername: '',
      signupPassword: '',
    }
    this.handleLoginUser = this.handleLoginUser.bind(this);
    this.handleLoginPassword = this.handleLoginPassword.bind(this);
    this.handleSignupUser = this.handleSignupUser.bind(this);
    this.handleSignupPassword = this.handleSignupPassword.bind(this);
  }

  handleLoginUser(e) {
    this.setState({
      loginUsername: e.target.value,
    })
  }

  handleLoginPassword(e) {
    this.setState({
      loginPassword: e.target.value,
    })
  }

  handleSignupUser(e) {
    this.setState({
      signupUsername: e.target.value,
    })
  }

  handleSignupPassword(e) {
    this.setState({
      signupPassword: e.target.value,
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className="row loginSignup">
            <h1>Login or Signup to start logging</h1>
            <div className="login col-md-3">
              <h4>Log In</h4>
              <TextField
                hintText="Enter Username"
                floatingLabelText="Username"
                onChange={this.handleLoginUser}
               />
               <br />
              <TextField
                type="password"
                hintText="Enter Password"
                floatingLabelText="Password"
                onChange={this.handleLoginPassword}
               />
               <br />
              <RaisedButton label="LOGIN" primary={true} onClick={this.props.login.bind(this, this.state.loginUsername, this.state.loginPassword)} />
            </div>
            <div className="col-md-3">
            </div>
            <div className="signup col-md-3">
              <h4>Sign Up</h4>
              <TextField
                hintText="Enter Username"
                floatingLabelText="Username"
                onChange={this.handleSignupUser}
              />
              <br />
              <TextField
                type="password"
                hintText="Enter Password"
                floatingLabelText="Password"
                onChange={this.handleSignupPassword}
              />
              <br />
              <RaisedButton label="SIGNUP" primary={true} onClick={this.props.signup.bind(this, this.state.signupUsername, this.state.signupPassword)}/>
            </div>
          </div>
          <div className="quote">
            <h1>"He who controls others may be powerful, but he who has mastered himself is mightier still."</h1>
            <br />
            <h3>-Lao Tzu</h3>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Login;