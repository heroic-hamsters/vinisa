import React from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import auth from '../auth.js';
import ajax from '../lib/ajax';
import AppStore from './AppStore.jsx';

@observer
export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    }
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
    AppStore.username = e.target.username.value;
    AppStore.password = e.target.password.value;

    var nativeLanguageIndex = e.target.nativeLanguage.selectedIndex;
    var learnLanguageIndex = e.target.learnLanguage.selectedIndex;
    var nativeLanguage = e.target.nativeLanguage[nativeLanguageIndex].textContent;
    var learnLanguage = e.target.learnLanguage[learnLanguageIndex].textContent;

    auth.signup(AppStore.username, AppStore.password, nativeLanguage, learnLanguage, (loggedIn) => {
      if (!loggedIn) {
        return this.setState({error: true});
      }
      browserHistory.push('/home');
    });
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

          <div><input className="general-button" type="submit" /></div>

          {this.state.error && (<p>Signup Failed</p>)}

        </form>

      </div>
    );
  }
}