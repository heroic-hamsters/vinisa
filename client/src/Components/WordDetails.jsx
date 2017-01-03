import React from 'react';

export default class WordDetails extends React.Component {
  render() {
    return (
      <div>
        <h1>this.props.params.word</h1>
        <div>水瓶</div>
        <div>shui ping</div>
        <br/>
        <button>Upload sample sentences here</button>
      </div>
    )
  }
}