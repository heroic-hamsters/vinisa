import React from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const store = this.props.route.store;
    return(
      <div>
        <Link to='/'>{store.sitename}</Link>
        {this.props.children}
      </div>
    );
  }
}