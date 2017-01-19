import React from 'react';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import Dropzone from 'react-dropzone';
import $ from 'jquery';
import ajax from '../lib/ajax';
import helpers from '../helpers.js';

// @observer
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.route.store;

    this.state = {
      imgsrc: '',
      pictureChosen: null,
      wordList: null
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
      imgsrc: file.preview,
      pictureChosen: true,
      wordList: null
    });

    // $('.pic-drop').hide();
    // $('.search-bar').hide();
    // $('.image-wordlist').show();
    // $('.another-button').show();
  }

  uploadAnother(e) {
    e.preventDefault();
    this.setState({
      pictureChosen: null,
      wordList: null
    });
    // $('.pic-drop').show();
    // $('.search-bar').show();
    // $('.image-wordlist').hide();
    // $('.another-button').hide();
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

    ajax.getLabels(request, function(data) {
      this.setState({
        wordList: data
      });
    }.bind(this));
  }

  // set word in the mobx store, redirect to word details page
  handleClick(e) {
    e.preventDefault();
    var chosenWord = e.target.innerHTML;
    this.store.word = chosenWord;


    ajax.addWord(chosenWord, function(data) {
      this.store.translatedWord = data;
      browserHistory.push('/word');
    }.bind(this));
  }

  handleSearch(e) {
    e.preventDefault();
    var searchTerm = e.target.query.value;

    this.store.word = searchTerm;

    ajax.addWord(searchTerm, function(data) {
      this.store.translatedWord = data;
      browserHistory.push('/word');
    }.bind(this));
  }

  render() {
    return (
      <div>

        {!this.state.pictureChosen &&
          <div className="search-box">
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
          </div>
        }

        {this.state.pictureChosen &&
          <div className="results-box">
            <div className="another-button">
              <button className="general-button" onClick={this.uploadAnother.bind(this)}>Upload another picture</button>
            </div>

            <div className="image-wordlist">

              <div>
                {this.state.imgsrc === '' ? null : <img className="found-image" src={this.state.imgsrc} />}
              </div>

              <div className="word-list-box" onClick={this.handleClick.bind(this)}>
                {!this.state.wordList &&
                  <img src="http://mupit.icm.jhu.edu/MuPIT_Interactive/images/load.gif" style={{width: '60px'}} />
                }
                <ul className="word-list">
                  {this.state.wordList &&
                    this.state.wordList.map( (word, index) => (
                      <li key={index}>{word}</li>
                    ))
                  }
                </ul>
              </div>

            </div>
          </div>
        }

      </div>
    );
  }
}
