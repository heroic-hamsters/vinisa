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
    this.loggedIn = auth.isLoggedIn()
  }

  render() {
    return (
      <div>
        <IndexLink to='/'>{this.store.sitename}</IndexLink>
        <br/>
        <NavLink to='/library'>Library</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/help'>Help</NavLink>
        <NavLink to='/settings'>Settings</NavLink>
        <NavLink to='/logout'>Logout</NavLink>
        <NavLink to='/signup'>signup</NavLink>
        {this.props.children}

      </div>
    );
  }
}
