import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import ajax from '../lib/ajax.js';

export default class SavedSentences extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sentences: null
    };
  }

  componentDidMount() {
    ajax.getSavedSentences(function(response) {
      var learnSentences = [];
      var urls = [];
      var nativeSentences = [];

      response.translatedSentences.forEach( tSentence => {
        learnSentences.push(tSentence.text);
        urls.push(tSentence.url);
      });

      response.nativeSentences.forEach( nSentence => {
        nativeSentences.push(nSentence.translation);
      });

      var sentenceObj = {
        nativeSentences: nativeSentences,
        learnSentences: learnSentences,
        urls: urls
      };

      this.setState({
        sentences: sentenceObj
      });
    }.bind(this));
  }

  render() {
    return (
      <div>
        <h3>Saved Sentences</h3>
        <ul>
          {this.state.sentences &&
            this.state.sentences.learnSentences.map( (sentence, index) => (
              <li>
                <div>{this.state.sentences.nativeSentences[index]}</div>
                <div>{sentence}</div>
                <div><audio src={this.state.sentences.urls[index]} controls="controls" /></div>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
