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
            <p>The most fun you'll have learning a new language</p>
          </div>
          <ul className="login-signup-button">
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/signup'>Signup</NavLink></li>
          </ul>
        </div>

        <div className="faq">
          <h1>Team Members</h1>
          <ul className="faq-list">

            <li>
              <div className="profile-img" id="viv-img" />
              <div className="profile-name-box">
                Vivian Zhang
                <a href="https://www.linkedin.com/in/vivianzhangmeng"><div className="linkedin-icon" /></a>
                <a href="https://github.com/vivzhang"><div className="github-icon" /></a>
              </div>
            </li>

            <li>
              <div className="profile-img" id="nt-img" />
              <div className="profile-name-box">
                Nick Tang
                <a href="https://linkedin.com/in/tangcius"><div className="linkedin-icon" /></a>
                <a href="https://github.com/singsai"><div className="github-icon" /></a>
              </div>
            </li>

            <li>
              <div className="profile-img" id="sam-img" />
              <div className="profile-name-box">
                Samuel He
                <a href=""><div className="linkedin-icon" /></a>
                <a href=""><div className="github-icon" /></a>
              </div>
            </li>

            <li>
              <div className="profile-img" id="nw-img" />
              <div className="profile-name-box">
                Nicholas Wang
                <a href="https://www.linkedin.com/in/nickwang55"><div className="linkedin-icon" /></a>
                <a href="https://github.com/niwang55"><div className="github-icon" /></a>
              </div>
            </li>
          </ul>
        </div>
        
      </div>
    );
  }
}