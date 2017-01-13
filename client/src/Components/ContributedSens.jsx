import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import Ajax from '../lib/ajax.js';

export default class ContributedSentences extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   Ajax.getContributedSentences(AppStore.username, (data) => {
  //     if (data) {
  //       AppStore.ContributedSentences.push(data)
  //     }
  //   })
  // }

        // move to line 31
        // {AppStore.ContributedSentences.map((sentence) => (
        //   <li key={sentence}>{sentence}</li>
        // ))}

  render() {
    return (
      <div>
        <h3>Contributed Sentences</h3>
        <ul>

        </ul>
      </div>
    );
  }
}
