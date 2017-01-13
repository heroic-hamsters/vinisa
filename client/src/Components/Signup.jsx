import React from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import ajax from '../lib/ajax';

// @observer
export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.store = this.props.route.store;
  }

  componentWillMount() {
    ajax.getLanguages(function(data) {
      data.forEach( lang => {

        $('#nativeLanguage').append($('<option>', {
          value: lang.name,
          text: lang.name
        }));

        $('#learnLanguage').append($('<option>', {
          value: lang.name,
          text: lang.name
        }));

      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.store.username = e.target.username.value;
    this.store.password = e.target.password.value;

    let languages = {
      nativeLanguage: e.target.nativeLanguage.value,
      learnLanguage: e.target.learnLanguage.value
    };
    var nativeLanguageIndex = e.target.nativeLanguage.selectedIndex;
    var learnLanguageIndex = e.target.learnLanguage.selectedIndex;
    var nativeLanguage = e.target.nativeLanguage[nativeLanguageIndex].textContent;
    var learnLanguage = e.target.learnLanguage[learnLanguageIndex].textContent;

    ajax.signupAjax(this.store.username, this.store.password, nativeLanguage, learnLanguage);
    this.store.languages = languages;
    browserHistory.push('/home');
  }

  render() {
    return (
      <div className="login-signup-box">
        <h1>Signup</h1>

        <form className="login-signup-form" onSubmit={ this.handleSubmit.bind(this) } >
          <div>Username: <input type="text" name="username" /></div>
          <div>Password: <input type="password" name="password" /></div>

          <div>
            Your Native Language:
            <select id="nativeLanguage" name="nativeLanguage">
              <option></option>
            </select>
          </div>

          <div>
            Language You'd Like to Learn:
            <select id="learnLanguage" name="learnLanguage">
              <option></option>
            </select>
          </div>

          <div><input id="general-button" type="submit" /></div>

        </form>

      </div>
    );
  }
}