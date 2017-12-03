import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogin: '',
      passyLogin: '',
      userSignUp: '',
      passySignUp: '',
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
  }

  handleTextFieldChange(e) {
    let target = e.target;
    let idx = e.target.id;
    this.setState({
      [idx]: target.value,
    });
    if (this.state.passyLogin.length >= 4 && this.state.userLogin.length >= 4 && e.key === 'Enter') {
      this.props.login(this.state.userLogin, this.state.passyLogin);
    }
    if (this.state.userSignUp.length >= 4 && this.state.passySignUp.length >= 4 && e.key === 'Enter') {
      this.props.signup(this.state.userSignUp, this.state.passySignUp);
    }
  }

  render() {
    return (
      <div className="login-signup login-signup-subgrid">
        <div className="title">
          <h1>Login or Signup to start logging</h1>
        </div>

        <div className="login-box">
          <h4>Log In</h4>
          <TextField
            id="userLogin"
            hintText="Enter Username"
            floatingLabelText="Username"
            onKeyUp={this.handleTextFieldChange}
          />
          <br />
          <TextField
            id="passyLogin"
            type="password"
            hintText="Enter Password"
            floatingLabelText="Password"
            onKeyUp={this.handleTextFieldChange}
          />
          <br />
          <RaisedButton
            label="LOGIN"
            primary={true}
            onClick={this.props.login.bind(this, this.state.userLogin, this.state.passyLogin)}
          />
          <br />
        </div>

        <div className="visualization-logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Social_Network_Analysis_Visualization.png" />
        </div>

        <div className="signup-box">
          <h4>Sign Up</h4>
          <TextField
            id="userSignUp"
            hintText="Enter Username"
            floatingLabelText="Username"
            onKeyUp={this.handleTextFieldChange}
          />
          <br />
          <TextField
            id="passySignUp"
            type="password"
            hintText="Enter Password"
            floatingLabelText="Password"
            onKeyUp={this.handleTextFieldChange}
          />
          <br />
          <RaisedButton
            label="SIGNUP"
            primary={true}
            onClick={this.props.signup.bind(this, this.state.userSignUp, this.state.passySignUp)}
          />
        </div>

        <div className="quote">
          <h1>"He who controls others may be powerful, but he who has mastered himself is mightier still."</h1>
          <br />
          <h3>
            <em>-Lao Tzu</em>
          </h3>
        </div>

        <div className="improve-yourself">
          <h2>Improve Yourself</h2>
          <p>
            Set goals and limits for yourself<br />
            <br />Improve your habits<br />
            <br />Track your success
          </p>
        </div>

        <div className="visualization-logo">
          <img src="https://www.analyticsinsight.net/wp-content/uploads/2017/09/data-visualization-tools-concept.png" />
        </div>

        <div className="feature-list">
          <h2>Features</h2>
          <p>
            Track habits by date<br />
            <br />Easily visualize your habits
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
