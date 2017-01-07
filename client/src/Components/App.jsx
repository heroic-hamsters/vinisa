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
        <IndexLink to='/'>{this.store.sitename}</IndexLink>
        <br/>
        <ul>
          <li><NavLink to='/home'>Home</NavLink></li>
          <li><NavLink to='/library'>Library</NavLink></li>
          <li><NavLink to='/help'>Help</NavLink></li>
          <li><NavLink to='/settings'>Settings</NavLink></li>
          <li><NavLink to='/login'>Login</NavLink></li>
          <li><NavLink to='/logout'>Logout</NavLink></li>
          <li><NavLink to='/signup'>signup</NavLink></li>
        </ul>
        {this.props.children}

      </div>
    );
  }
}
