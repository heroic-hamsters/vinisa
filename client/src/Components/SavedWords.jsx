import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

@observer
export default class SavedWords extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>SavedWords</h1>
        <ul>
        </ul>
        <div>test store below</div>
      </div>
    )
  }
}