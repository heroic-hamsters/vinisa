import React from 'react';
import { Link } from 'react-router';

export default class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <div className="information">
          <h2>Language Learning with Photos</h2>
          <p>Take a photo, and it will identify what objects are in that photo and translate it for you into your language of choice.</p>
          <p>More details here</p>
        </div>

        <div className="signup-button">
          <button><Link to="/signup">Signup</Link></button>
        </div>

      </div>
    );
  }
}