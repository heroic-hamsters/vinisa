import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import ajax from '../lib/ajax.js';

@observer
export default class ContributedSentences extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sentences: null,
    };
  }

  componentDidMount() {
    ajax.getContributedSentences(function(response) {
      var sentenceArr = [];
      response.forEach(function(sentence) {
        var sentenceObj = {
          text: sentence.text,
          url: sentence.url
        };
        sentenceArr.push(sentenceObj);
      });
      this.setState({
        sentences: sentenceArr
      });
    }.bind(this));
  }

  render() {
    return (
      <div>
        <h3>Contributed Sentences</h3>
        <ul>
          {this.state.sentences &&
            this.state.sentences.map( (sentence, index) => (
              <li key={index}>
                <div>{sentence.text}</div>
                <div><audio src={sentence.url} controls="controls" /></div>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
