import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { Link, IndexLink } from 'react-router';
import { browserHistory } from 'react-router';
import ajax from '../lib/ajax';
import Navbar from './Navbar.jsx';

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
      if (data[0].words) {
        data[0].words.forEach( word => arr.push(word.text) );
      }
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
      <div className="library-container">
        <div className="library-box">
          <h1>My Library
          <button id="general-button"><Link to="/savedwords">Saved Words</Link></button>
          <button id="general-button"><Link to="/savedsentences">Saved Sentences</Link></button>
          <button id="general-button"><Link to="/contributedsentences">Contributed Sentences</Link></button></h1>
          {this.props.children}
        </div>
      </div>
    );
  }
}
