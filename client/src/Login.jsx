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
    };
    this.handleLoginUser = this.handleLoginUser.bind(this);
    this.handleLoginPassword = this.handleLoginPassword.bind(this);
    this.handleSignupUser = this.handleSignupUser.bind(this);
    this.handleSignupPassword = this.handleSignupPassword.bind(this);
  }

  handleLoginUser(e) {
    this.setState({
      loginUsername: e.target.value,
    });
  }

  handleLoginPassword(e) {
    this.setState({
      loginPassword: e.target.value,
    });
  }

  handleSignupUser(e) {
    this.setState({
      signupUsername: e.target.value,
    });
  }

  handleSignupPassword(e) {
    this.setState({
      signupPassword: e.target.value,
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className="row loginSignup">
            <h1>Login or Signup to start logging</h1>
            <div className="login col-md-4">
              <h4>Log In</h4>
              <TextField hintText="Enter Username" floatingLabelText="Username" onChange={this.handleLoginUser} />
              <br />
              <TextField
                type="password"
                hintText="Enter Password"
                floatingLabelText="Password"
                onChange={this.handleLoginPassword}
              />
              <br />
              <RaisedButton
                label="LOGIN"
                primary={true}
                onClick={this.props.login.bind(this, this.state.loginUsername, this.state.loginPassword)}
              />
            </div>
            <div className="col-md-4 icon">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Social_Network_Analysis_Visualization.png" />
            </div>
            <div className="signup col-md-4">
              <h4>Sign Up</h4>
              <TextField hintText="Enter Username" floatingLabelText="Username" onChange={this.handleSignupUser} />
              <br />
              <TextField
                type="password"
                hintText="Enter Password"
                floatingLabelText="Password"
                onChange={this.handleSignupPassword}
              />
              <br />
              <RaisedButton
                label="SIGNUP"
                primary={true}
                onClick={this.props.signup.bind(this, this.state.signupUsername, this.state.signupPassword)}
              />
            </div>
          </div>
          <div className="quote">
            <h1>"He who controls others may be powerful, but he who has mastered himself is mightier still."</h1>
            <br />
            <h3>
              <em>-Lao Tzu</em>
            </h3>
          </div>
          <div className="row highlights">
            <div className="col-md-4 use">
              <h2>Improve Yourself</h2>
              <p>Set goals and limits for yourself</p>
              <p>Improve your habits</p>
              <p>Track your success</p>
            </div>
            <div className="col-md-4 icon">
              <img src="https://www.analyticsinsight.net/wp-content/uploads/2017/09/data-visualization-tools-concept.png" />
            </div>
            <div className="col-md-4 features">
              <h2>Features</h2>
              <p>
                Track habits by date<br />Easily visualize your habits
              </p>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Login;
