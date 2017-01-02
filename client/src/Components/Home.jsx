import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.route.store;
  }

  render() {
    return (
      <div>
        <button>Upload or drag a photo here</button>
      </div>
    );
  }
}