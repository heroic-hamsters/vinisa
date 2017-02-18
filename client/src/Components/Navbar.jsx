import React from 'react';
import { Link, browserHistory } from 'react-router';
import NavLink from './NavLink.jsx';
import auth from '../auth.js';

export default class Navbar extends React.Component {
  handleLogout() {
    auth.logout();
    browserHistory.push('/');
  }

  render() {
    return (
      <div>
      
        <ul className="navbar">
          <li><NavLink to='/home'>Home</NavLink></li>
          <li><NavLink to='/library'>Library</NavLink></li>
          <li><NavLink to='/about'>About</NavLink></li>
          <li><NavLink to='/settings'>Settings</NavLink></li>
          <li><NavLink onClick={this.handleLogout.bind(this)}>Logout</NavLink></li>
        </ul>

        {this.props.children}

      </div>
    );
  }
}