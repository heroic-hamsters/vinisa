import React from 'react';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import Dropzone from 'react-dropzone';
import $ from 'jquery';
import Config from '../../env/config.js';
import ajax from '../lib/ajax';

@observer
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.route.store;

    this.state = {
      imgsrc: ''
    };

  }

  onDrop(acceptedFiles, rejectedFiles) {
    var file = acceptedFiles[0];

    // Have to turn the uploaded picture into base64 to work with Google's API
    var reader = new FileReader();
    reader.onloadend = this.processFile;
    reader.readAsDataURL(file);

    this.setState({
      imgsrc: file.preview
    });
  }

  // POST base64 picture to Vision API with label detection parameter
  processFile(e) {
    var content = e.target.result.replace('data:image/jpeg;base64,', '');

    var request = {
      requests: [{
        image: {
          content: content
        },
        features: [{
          type: 'LABEL_DETECTION'
        }]
      }]
    };
    $.post({
      url: 'https://vision.googleapis.com/v1/images:annotate?key=' + Config['CLOUD_API'],
      data: JSON.stringify(request),
      contentType: 'application/json'
    }).done(function(data) {
      // Create a list using jQuery with the labels of the picture
      var responseArray = data.responses[0].labelAnnotations;
      var wList = $('ul.wordList');

      wList.empty();
      responseArray.forEach( response => {
        var li = $('<li />').text(response.description).appendTo(wList);
      });
    });
  }

  // set word in the mobx store, redirect to word details page
  handleClick(e) {
    e.preventDefault();
    var chosenWord = e.target.innerHTML;
    this.store.word = chosenWord;

    ajax.addWord(this.store.username, chosenWord);
    browserHistory.push('/word');
  }

  render() {
    return (
      <div>
        <Dropzone style={{'width': '400px', 'height': '150px', 'border': '0.5px dashed'}} onDrop={this.onDrop.bind(this)}>
          <div style={{'textAlign': 'center', 'marginTop': '15%'}}>Drag and drop a photo here or click to upload.</div>
        </Dropzone>

        {this.state.imgsrc === '' ? null : <img style={{'height': '300px'}} src={this.state.imgsrc} />}

        <div className="wordListBox" onClick={this.handleClick.bind(this)}>
          <ul className="wordList">
          </ul>
        </div>

      </div>
    );
  }
}
