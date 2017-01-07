import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import ajax from '../lib/ajax';

@observer
export default class Library extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.route.store;
    this.state = {
      words: []
    };
  }

  componentDidMount() {
    ajax.getWords(this.store.username, function(data) {
      var arr = [];
      data[0].words.forEach( word => arr.push(word.text) );
      this.setState({
        words: arr
      });
    }.bind(this));
  }

  onWordSelect(event) {
    event.persist();
    event.preventDefault();
    this.store.word = event.target.innerText;
    browserHistory.push('/word');
  }

  render() {
    return (
      <div>
        <h1>My Library</h1>
        <ul>
          {this.state.words.map( word => <li onClick={this.onWordSelect.bind(this)}>{word}</li>)}
        </ul>
      </div>
    );
  }
}