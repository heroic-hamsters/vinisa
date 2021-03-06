import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import AppStore from './AppStore.jsx';
import ajax from '../lib/ajax.js';

@observer
export default class SavedWords extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      words: null
    };
  }

  // Get the words saved by the user
  componentDidMount() {
    AppStore.savedWords = {};
    ajax.getWords(function(data) {
      if (data) {
        for (var i = 0; i < data.words.length; i++) {
          AppStore.savedWords[data.words[i].text] = data.translations[i].translation;
        }
      }
      this.setState({
        words: AppStore.savedWords
      });
    }.bind(this));
  }

  // When a word is selected, set the store to that word and redirect to
  // the word details page
  onWordSelect(word) {
    AppStore.word = word;
    AppStore.translatedWord = AppStore.savedWords[word];
    browserHistory.push('/word');
  }

  // When a user removes a word, delete the relation in the database
  handleRemoveWord(word) {
    ajax.unsaveWord(word, function(data) {
      console.log('deleted: ', data);
    });

    // Render the deletion client side
    var wordObj = this.state.words;
    delete wordObj[word];

    this.setState({
      words: wordObj
    });
  }

  render() {
    return (
      <div>
        <h3>Saved Words</h3>
        <ul id="saved-word-list">
          {this.state.words &&
            Object.keys(this.state.words).map((word, index) => (
              <li className="gen-list" key={index}>
                <div className="library-word" onClick={this.onWordSelect.bind(this, word)}>{word}</div>
                <button className="remove-saved-word-button general-button" onClick={this.handleRemoveWord.bind(this, word, index)}>Remove word from library</button>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
