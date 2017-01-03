import React from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.route.store;
  }

  render() {
    return (
      <div>
        <Link to='/'>{store.sitename}</Link>
        {this.props.children}
      </div>
    );
  }
}