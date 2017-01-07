import React from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import auth from '../auth';

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.route.store;
    this.loggedIn = auth.isLoggedIn()
  }

  render() {
    return (
      <div>
        <Link to='/'>{this.store.sitename}</Link>
        {this.props.children}
      </div>
    );
  }
}
