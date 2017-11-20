import React from 'react';

class Auth extends React.Component {
  // ...
  constructor(props) {
    super(props)
    this.showLock = this.showLock.bind(this);
  }

  showLock() {
    // Show the Auth0Lock widget
    this.props.lock.show();
  }

  render() {
    return (
      <div className="login-box">
        <button onClick={this.showLock}>Sign In</button>
      </div>
    );
  }
};

export default Auth;