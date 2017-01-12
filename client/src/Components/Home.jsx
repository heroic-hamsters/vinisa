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

    $('.dropzone').hide();
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
      var wList = $('ul.word-list');

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
      <div className="home-box">

      <div className="dropzone-box">
        <Dropzone className="dropzone" onDrop={this.onDrop.bind(this)}>
          <div className="dropzone-text">Drag and drop a photo here or click to upload.</div>
        </Dropzone>
      </div>

      <div className="image-wordlist">

        <div>
          {this.state.imgsrc === '' ? null : <img className="found-image" src={this.state.imgsrc} />}
        </div>

        <div className="word-list-box" onClick={this.handleClick.bind(this)}>
          <ul className="word-list">
          </ul>
        </div>

      </div>


      </div>
    );
  }
}
