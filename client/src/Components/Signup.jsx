import React from 'react';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Signup</h1>

        <form className="signupForm">
          <div>Username: <input type="text" /></div>
          <div>Password: <input type="password" /></div>

          <div>
            Your language: 
            <select>
              <option>English</option>
              <option>Chinese</option>
            </select>
          </div>

          <div>
            Language you want to learn:
            <select>
              <option>English</option>
              <option>Chinese</option>
            </select>
          </div>

          <div><input type="submit" /></div>

        </form>

      </div>
    );
  }
}