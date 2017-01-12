import React from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink.jsx';

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
      
        <ul className="navbar">
          <li><NavLink to='/home'>Home</NavLink></li>
          <li><NavLink to='/library'>Library</NavLink></li>
          <li><NavLink to='/help'>Help</NavLink></li>
          <li><NavLink to='/settings'>Settings</NavLink></li>
          <li><NavLink to='/logout'>Logout</NavLink></li>
        </ul>

        {this.props.children}

      </div>
    );
  }
}