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
            <h3>Crowdsourced and image based language learning</h3>
            <p>Taking the mundane and isolated feeling out of online language learning</p>
          </div>
          <ul className="login-signup-button">
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/signup'>Signup</NavLink></li>
          </ul>
        </div>

        <div className="faq">
          <h1>Team Members</h1>
          <ul className="faq-list">
            <li>Vivian Zhang</li>
            <li>Nick Tang</li>
            <li>Samuel He</li>
            <li>Nicholas Wang</li>
          </ul>
        </div>
        
      </div>
    );
  }
}