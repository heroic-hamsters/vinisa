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
        <a href='/'>{store.sitename}</a>
        {this.props.children}
      </div>
    );
  }
}