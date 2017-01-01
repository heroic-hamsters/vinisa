import React from 'react';
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
        <h1>{store.sitename}</h1>
        {this.props.children}
      </div>
    );
  }
}