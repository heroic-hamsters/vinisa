import React from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

@observer
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.route.store;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.store.username = e.target.username.value;
    browserHistory.push('/home');
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={ this.handleSubmit.bind(this) }>
          Username: <input type="text" name="username" />
          Password: <input type="password" name="password" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}