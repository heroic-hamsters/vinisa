import React from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import ajax from '../lib/ajax';
import {signupAjax} from '../lib/ajax';

@observer
export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.store = this.props.route.store;
k dev server and add tables and models to the database
  }

  handleSubmit(e) {
    e.preventDefault();

    this.store.username = e.target.username.value;
    this.store.password = e.target.password.value;

    let languages = {
      nativeLanguage: e.target.nativeLanguage.value,
      learnLanguage: e.target.learnLanguage.value
    };
    signupAjax(this.store.username, this.store.password, languages.nativeLanguage, languages.learnLanguage);
    this.store.languages = languages;
    browserHistory.push('/home');
  }

  render() {
    return (
      <div>
        <h1>Signup</h1>

        <form className="signupForm" onSubmit={ this.handleSubmit.bind(this) } >
          <div>Username: <input type="text" name="username" /></div>
          <div>Password: <input type="password" name="password" /></div>

          <div>
            Your Native Language:
            <select name="nativeLanguage">
              <option></option>
              <option value='en-US'>English</option>
              <option value='cmn-Hans-CN'>Chinese</option>
            </select>
          </div>

          <div>
            Language You'd Like to Learn:
            <select name="learnLanguage">
              <option></option>
              <option value="en">English</option>
              <option value="zh-TW">Chinese</option>
            </select>
          </div>

          <div><input type="submit" /></div>

        </form>

      </div>
    );
  }
}