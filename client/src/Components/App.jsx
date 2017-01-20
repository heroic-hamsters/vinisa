import React from 'react';
import { Link, IndexLink } from 'react-router';
import { observer } from 'mobx-react';
import auth from '../auth';
import NavLink from './NavLink.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.loggedIn = auth.isLoggedIn();
  }

  render() {
    return (
      <div>
        <div className="title-bar">
          <IndexLink to='/' className="website-title"><div className="logo" /></IndexLink>
        </div>
        <br/>

        {this.props.children}

      </div>
    );
  }
}
