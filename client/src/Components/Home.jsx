import React from 'react';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import Dropzone from 'react-dropzone';
import $ from 'jquery';
import ajax from '../lib/ajax';
import helpers from '../helpers.js';

@observer
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.route.store;

    this.state = {
      imgsrc: ''
    };
  }

  componentWillMount() {
    ajax.getCodes(function(data) {
      this.store.nativeLanguage = data[0].name;
      this.store.learnLanguage = data[1].name;
      
      this.store.nativeLanguageCode = data[0].translateCode;
      this.store.learnLanguageCode = data[1].translateCode;
      this.store.nativeLanguageSpeechCode = data[0].speechCode;
      this.store.learnLanguageSpeechCode = data[1].translateCode;

    }.bind(this));
  }

  onDrop(acceptedFiles, rejectedFiles) {
    var file = acceptedFiles[0];

    // Have to turn the uploaded picture into base64 to work with Google's API
    var reader = new FileReader();
    reader.onloadend = this.processFile.bind(this);
    reader.readAsDataURL(file);

    this.setState({
      imgsrc: file.preview
    });

    $('.pic-drop').hide();
    $('.search-bar').hide();
    $('.image-wordlist').show();
    $('.another-button').show();
  }

  uploadAnother(e) {
    e.preventDefault();
    $('.pic-drop').show();
    $('.search-bar').show();
    $('.image-wordlist').hide();
    $('.another-button').hide();
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

    helpers.detectLabels(request, function(data) {
      // Create a list using jQuery with the labels of the picture
      var responseArray = data.responses[0].labelAnnotations;

      this.translateAndDisplayLabels(responseArray);
    }.bind(this));
  }

  translateAndDisplayLabels(responseArray) {
    var finalArray = [];
    var wList = $('ul.word-list');
    wList.empty();

    for (var i = 0; i < responseArray.length; i++) {
      helpers.translateText(responseArray[i].description, this.store.nativeLanguageCode, function(response) {
        var translated = response.data.translations[0].translatedText;
        var li = $('<li />').text(translated).appendTo(wList);
      }.bind(this));
    }
  }

  // set word in the mobx store, redirect to word details page
  handleClick(e) {
    e.preventDefault();
    var chosenWord = e.target.innerHTML;
    this.store.word = chosenWord;


    helpers.translateText(chosenWord, this.store.learnLanguageCode, function(response) {
      var translated = response.data.translations[0].translatedText;
      this.store.translatedWord = translated;
      ajax.addWord(chosenWord, translated);
      browserHistory.push('/word');
    }.bind(this));

    browserHistory.push('/word');
  }

  handleSearch(e) {
    e.preventDefault();
    var searchTerm = e.target.query.value;

    this.store.word = searchTerm;

    helpers.translateText(searchTerm, this.store.learnLanguageCode, function(response) {
      var translated = response.data.translations[0].translatedText;
      this.store.translatedWord = translated;
      ajax.addWord(searchTerm, translated);
      browserHistory.push('/word');
    }.bind(this));

    browserHistory.push('/word');
  }

  render() {
    return (
      <div className="home-box">

        <div className="search-bar">
          <h2>Search for a term or upload a picture.</h2>
          <form onSubmit={this.handleSearch.bind(this)} id="search">
            <input name="query" type="text" size="40" placeholder="Search..." />
          </form>
        </div>

        <div className="pic-drop-box">
          <Dropzone className="pic-drop" onDrop={this.onDrop.bind(this)}>
            <div className="pic-drop-text">Drag and drop a photo here or click to upload.</div>
          </Dropzone>
        </div>

        <div className="another-button" style={{'display': 'none'}}>
          <button id="general-button" onClick={this.uploadAnother.bind(this)}>Upload another picture</button>
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
