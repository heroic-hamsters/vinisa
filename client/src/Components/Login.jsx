import React from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import auth from '../auth.js';

@observer
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.route.store;
    this.state = {
      error: false
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.store.username = e.target.username.value;
    this.store.password = e.target.password.value;
    auth.login(this.store.username, this.store.password, (loggedIn) => {
      if (!loggedIn) {
        return this.setState({error: true});
      }
      browserHistory.push('/home');
    });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={ this.handleSubmit.bind(this) }>
          Username: <input type="text" name="username" />
          Password: <input type="password" name="password" />
          <input type="submit" />
          {this.state.error && (<p>Login Failed</p>)}
        </form>
      </div>
    );
  }
}