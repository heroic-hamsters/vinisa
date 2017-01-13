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
    Ajax.getWords(AppStore.username, (data) => {
      if (data) {
        data[0].words.forEach((word) => {
          AppStore.savedWords.push(word.text);
        });
      }
    });
  }
  
  onWordSelect(e) {
    e.preventDefault();
    Ajax.getSentences(e.target.innerText, (data) => {
      console.log(data);
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

          // move to line 52
          // {AppStore.savedWords.map((word) => (
          //   <li key={word} onClick={this.onWordSelect.bind(this)}>{word}</li>
          // ))}

  render() {
    return (
      <div>
        <h3>Saved Words</h3>
        <ul>

        </ul>
      </div>
    );
  }
}
