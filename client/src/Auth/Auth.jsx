import auth0 from 'auth0-js';

class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'stoneandsand.auth0.com',
    clientID: '3IeFIWa1Zzq3eKckaP5R7txhePA0Wqsf',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://stoneandsand.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}

export default Auth;