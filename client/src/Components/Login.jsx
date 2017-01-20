import React from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import auth from '../auth.js';
import $ from 'jquery';
import NavLink from './NavLink.jsx';
import ajax from '../lib/ajax';
import AppStore from './AppStore.jsx'

@observer
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    AppStore.username = e.target.username.value;
    AppStore.password = e.target.password.value;
    auth.login(AppStore.username, AppStore.password, (loggedIn) => {
      if (!loggedIn) {
        return this.setState({error: true});
      }
      browserHistory.push('/home');
    });
  }

  render() {
    return (
      <div className="login-signup-box">
        <h1>Login</h1>
        <form className="login-signup-form" onSubmit={ this.handleSubmit.bind(this) }>
          Username: <input type="text" name="username" />
          Password: <input type="password" name="password" />
          <input className="general-button" type="submit" />
          {this.state.error && (<p>Login Failed</p>)}
        </form>
      </div>
    );
  }
}