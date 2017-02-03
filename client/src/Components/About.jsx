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

        <div className="faq">
          <br/>
          <h1>HERE'S HOW IT WORKS</h1>
          <br/>
          <div className='instruction'>
            <h3>Sign up/ Log in</h3>
            <div>Choose your native language and language you'd like to learn</div>
            <br/>
            <center><img className='instruction-img' src='../assets/signup.png'></img></center>
            <h3>Upload</h3>
            <div>Upload a photo or enter a word</div>
            <br/>
            <center><img className='instruction-img' src='../assets/upload_word.png'></img></center>
            <br/>
            <div>We make some magic</div>
            <br/>
            <center><img className='instruction-img' src='../assets/puppies_words.png'></img></center>
            <br/>
            <div>You choose the word</div>
            <br/>
            <center><img className='instruction-img' src='../assets/dog_word.png'></img></center>
            <h3>Record</h3>
            <div>If you'd like to contribute back to the community, record and upload a sentence in your native language containing that word, next time when other learners want to learn that word in your native language, they will be able see and listen your recorded sentences<img className='smileyface' src='../assets/smileyface.png'></img></div>
            <br/>
            <center><img className='instruction-img' src='../assets/recorded_dogs.png'></img></center>
          </div>

          {
          // <h1>Team Members</h1>
          // <ul className="faq-list">

          //   <li>
          //     <div className="profile-img" id="viv-img" />
          //     <div className="profile-name-box">
          //       Vivian Zhang
          //       <a href="https://www.linkedin.com/in/vivianzhangmeng"><div className="linkedin-icon" /></a>
          //       <a href="https://github.com/vivzhang"><div className="github-icon" /></a>
          //     </div>
          //   </li>

          //   <li>
          //     <div className="profile-img" id="nt-img" />
          //     <div className="profile-name-box">
          //       Nick Tang
          //       <a href="https://linkedin.com/in/tangcius"><div className="linkedin-icon" /></a>
          //       <a href="https://github.com/singsai"><div className="github-icon" /></a>
          //     </div>
          //   </li>

          //   <li>
          //     <div className="profile-img" id="sam-img" />
          //     <div className="profile-name-box">
          //       Samuel He
          //       <a href="https://www.linkedin.com/in/samuel-he-3b792b86"><div className="linkedin-icon" /></a>
          //       <a href="https://github.com/samuelhe83"><div className="github-icon" /></a>
          //     </div>
          //   </li>

          //   <li>
          //     <div className="profile-img" id="nw-img" />
          //     <div className="profile-name-box">
          //       Nicholas Wang
          //       <a href="https://www.linkedin.com/in/nickwang55"><div className="linkedin-icon" /></a>
          //       <a href="https://github.com/niwang55"><div className="github-icon" /></a>
          //     </div>
          //   </li>
          // </ul>
        }
        </div>
      </div>
    );
  }
}