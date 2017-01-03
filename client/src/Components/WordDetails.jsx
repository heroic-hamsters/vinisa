import React from 'react';
var Dropzone = require('react-dropzone');

export default class WordDetails extends React.Component {
  // play an audio clip
  onAudioPlay() {
    var audio = new Audio('https://s3.amazonaws.com/translate-hamster/audio/bottle1.m4a');
    audio.play();
  }
  // upload an audio clip
  onDrop(acceptedFiles, rejectedFiles) {
    console.log('acceptedFiles', acceptedFiles);
    console.log('rejectedFiles', rejectedFiles);
  }

  render() {
    return (
      <div>
        <h1>{this.props.params.word}</h1>
        <div>水瓶</div>
        <div>shui ping</div>
        <div>Can you pass me that bottle?</div>
        <div>可以递给我那个水瓶吗？</div>
        <button onClick={this.onAudioPlay}>Play</button>
        <br/>
        <Dropzone onDrop={this.onDrop}>
          <div>Upload or drag an audio file here</div>
        </Dropzone>
      </div>
    )
  }
}