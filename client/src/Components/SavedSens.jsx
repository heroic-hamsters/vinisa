import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import Ajax from '../lib/ajax.js';

export default class SavedSentences extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   Ajax.getSavedSentences(AppStore.username, (data) => {
  //     if (data) {
  //       AppStore.SavedSentences.push(data)
  //     }
  //   })
  // }
          // move to line 30
          // {AppStore.SavedSentences.map((sentence) => (
          //   <li key={sentence}>{sentence}</li>
          // ))}

  render() {
    return (
      <div>
        <h3>Saved Sentences</h3>
        <ul>

        </ul>
      </div>
    );
  }
}
