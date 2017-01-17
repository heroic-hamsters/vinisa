import React from 'react';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import $ from 'jquery';
import ajax from '../lib/ajax';
import Navbar from './Navbar.jsx';

@observer
export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.route.store;

    this.state = {
      error: false
    }
  }

  componentWillMount() {
    ajax.getCodes(function(data) {
      this.store.nativeLanguage = data[0].name;
      this.store.learnLanguage = data[1].name;

    }.bind(this));

    ajax.getLanguages(function(data) {
      data.forEach( lang => {
        $('#learnLanguage').append($('<option>', {
          value: lang.name,
          text: lang.name
        }));

      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    ajax.addLanguage(e.target.language.value);
    this.store.learnLanguage = e.target.language.value;
    // console.log(e.target.language.value);
  }

  render() {
    return (
      <div className="login-signup-box">
        <h1>Settings</h1>

        <form className="login-signup-form" onSubmit={ this.handleSubmit.bind(this) } >
          <div>
            Current Target Language: {this.store.learnLanguage}
          </div>
          <div>
            Language You'd Like to Learn:&nbsp;
            <select id="learnLanguage" name="language">
              <option></option>
            </select>
          </div>

          <div><input id="general-button" type="submit" /></div>

          {this.state.error && (<p>Signup Failed</p>)}

        </form>

      </div>
    )
  }
}
