import React from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import $ from 'jquery';

 @observer
export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.route.store;
    this.signupAjax = this.signupAjax.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.store.username = e.target.username.value;
    this.store.password = e.target.password.value;

    let languages = {
      nativeLanguage: e.target.nativeLanguage.value,
      learnLanguage: e.target.learnLanguage.value
    };
    this.signupAjax();
    this.store.languages = languages;

    browserHistory.push('/home');
  }

  signupAjax() {
    console.log(this.store.username);
    console.log(this.store.password);
    $.ajax({
      url: '/api/signup',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({username:this.store.username, password: this.store.password}),
      success: (data) => { console.log(data); },
      error: (err) => {console.log(err);}
    });
  }

  render() {
    return (
      <div>
        <h1>Signup</h1>

        <form className="signupForm" onSubmit={ this.handleSubmit.bind(this) } >
          <div>Username: <input type="text" name="username" /></div>
          <div>Password: <input type="password" name="password" /></div>

          <div>
            Your language:
            <select name="nativeLanguage">
              <option value='en-US'>English</option>
              <option value='cmn-Hans-CN'>Chinese</option>
            </select>
          </div>

          <div>
            Language you want to learn:
            <select name="learnLanguage">
              <option>English</option>
              <option selected>Chinese</option>
            </select>
          </div>

          <div><input type="submit" /></div>

        </form>

      </div>
    );
  }
}