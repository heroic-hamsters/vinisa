import React from 'react';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import $ from 'jquery';
import ajax from '../lib/ajax';
import Navbar from './Navbar.jsx';

@observer
export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.route.store;
  }
  render() {
    return (
      <div>
        Settings
      </div>
    )
  }
}
