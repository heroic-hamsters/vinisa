import React from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink.jsx';

export default class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="information">
          <div className="information-text">
            <div className="slogan">Crowdsourced and Image Based Language Learning</div>
            <br/>
            <div>The Most Fun You'll Have Learning a New Language</div>
          </div>
          <ul className="login-signup-button">
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/signup'>Signup</NavLink></li>
          </ul>
        </div>
      </div>
    );
  }
}