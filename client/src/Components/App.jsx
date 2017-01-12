import React from 'react';
import { Link, IndexLink } from 'react-router';
import { observer } from 'mobx-react';
import auth from '../auth';
import NavLink from './NavLink.jsx';

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.route.store;
    this.loggedIn = auth.isLoggedIn();
  }

  render() {
    return (
      <div>
        <div className="title-bar">
          <IndexLink to='/' className="website-title">{this.store.sitename}</IndexLink>
        </div>
        <br/>

        {this.props.children}

      </div>
    );
  }
}
