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
      <div>
        <h1>My Library</h1>
        <button><Link to="library/savedwords">Saved Words</Link></button>
        <button><Link to="library/savedsentences">savedsentences</Link></button>
        <button><Link to="library/contributedsentences">contributed sentences</Link></button>
        {this.props.children}
      </div>
    );
  }
}
