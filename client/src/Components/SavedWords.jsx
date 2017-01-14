import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import AppStore from './AppStore.jsx';
import Ajax from '../lib/ajax.js';

@observer
export default class SavedWords extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(AppStore.username);
    Ajax.getWords( (data) => {
      if (data) {
        console.log(data);
        data[0].words.forEach((word) => {
          console.log(word);
          AppStore.savedWords.push(word.translation);
        });
      }
    });
  }
  
  onWordSelect(e) {
    e.preventDefault();
    var selectedText = e.target.innerText;
    Ajax.getSentences(selectedText, (data) => {
      for (var i = 0; i < data.length; i++) {
        console.log('text', data[i].text);
        AppStore.savedSentences.push(data[i].text);

      }
      // console.log(AppStore.savedSentences)
      // data.forEach(sentence => {
      //   AppStore.savedSentences.push(sentence)
      //   console.log(AppStore.savedSentences)
      // })
    });
  }

  render() {
    return (
      <div>
        <h3>Saved Words</h3>
        <ul>
        {AppStore.savedWords.map((word) => (
          <li key={word} onClick={this.onWordSelect.bind(this)}>{word}</li>
        ))}
        </ul>
      </div>
    );
  }
}
