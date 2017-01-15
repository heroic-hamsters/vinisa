import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import AppStore from './AppStore.jsx';
import Ajax from '../lib/ajax.js';

// @observer
export default class SavedWords extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AppStore.savedWords = {};
    Ajax.getWords((data) => {
      if (data) {
        for (var i = 0; i < data.words.length; i++) {
          AppStore.savedWords[data.words[i].text] = data.translations[i].translation;
        }
      }
      Object.keys(AppStore.savedWords).forEach( (word) => {
        var listItem = '<li key="' + word + '">' + word + '</li>';
        $('#saved-word-list').append(listItem);
      });
    });
  }

  onWordSelect(e) {
    e.preventDefault();
    var selectedText = e.target.innerText;
    AppStore.word = selectedText;
    AppStore.translatedWord = AppStore.savedWords[selectedText];
    browserHistory.push('/word');
    // Ajax.getSentences(selectedText, (data) => {
    //   for (var i = 0; i < data.length; i++) {
    //     AppStore.savedSentences.push(data[i].text);

    //   }
      // console.log(AppStore.savedSentences)
      // data.forEach(sentence => {
      //   AppStore.savedSentences.push(sentence)
      //   console.log(AppStore.savedSentences)
      // })
    // });
  }

  render() {
    return (
      <div>
        <h3>Saved Words</h3>
        <ul onClick={this.onWordSelect.bind(this)} id="saved-word-list">
        </ul>
      </div>
    );
  }
}
