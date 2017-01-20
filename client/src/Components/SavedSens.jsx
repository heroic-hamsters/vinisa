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

  // Get the sentences that were saved by the user
  componentDidMount() {
    this.getSentences();
  }

  // This function formats the response from the server and sets it to the state
  getSentences() {
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

  // This removes a saved sentence based on its url
  handleRemoveSentence(index, url) {
    var urlSearchParam = new URLSearchParams();
    urlSearchParam.append('url', url);
    ajax.removeSavedSentence(urlSearchParam.toString(), function() {
      console.log('sentence removed');
    });

    // Render the removal client side
    this.state.sentences.nativeSentences.splice(index, 1);
    this.state.sentences.learnSentences.splice(index, 1);
    this.state.sentences.urls.splice(index, 1);

    var sentenceObj = {
      nativeSentences: this.state.sentences.nativeSentences,
      learnSentences: this.state.sentences.learnSentences,
      urls: this.state.sentences.urls
    };

    this.setState({
      sentences: sentenceObj
    });
  }

  render() {
    return (
      <div>
        <h3>Saved Sentences</h3>
        <ul>
          {this.state.sentences &&
            this.state.sentences.learnSentences.map( (sentence, index) => (
              <li key={index}>
                <div>{this.state.sentences.nativeSentences[index]}</div>
                <div>{sentence}</div>
                <div><audio src={this.state.sentences.urls[index]} controls="controls" /></div>
                <button className="general-button" onClick={this.handleRemoveSentence.bind(this, index, this.state.sentences.urls[index])}>Remove Saved Sentence</button>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
