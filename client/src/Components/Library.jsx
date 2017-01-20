import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { Link, IndexLink } from 'react-router';
import { browserHistory } from 'react-router';
import ajax from '../lib/ajax';
import Navbar from './Navbar.jsx';
import AppStore from './AppStore.jsx'

@observer
export default class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: []
    };
  }

  render() {
    return (
      <div className="library-container">
        <div className="library-box">
          <h1>My Library</h1>
          <div>
            <button className="general-button"><Link to="/savedwords">Saved Words</Link></button>
            <button className="general-button"><Link to="/savedsentences">Saved Sentences</Link></button>
            <button className="general-button"><Link to="/contributedsentences">Contributed Sentences</Link></button>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
