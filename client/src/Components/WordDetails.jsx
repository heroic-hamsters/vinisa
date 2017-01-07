import React from 'react';
import $ from 'jquery';
import CLOUD_API from '../../env/config.js';
import Dropzone from 'react-dropzone';
import ajax from '../lib/ajax.js';

export default class WordDetails extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.route.store;
  }

  componentDidMount() {
    var getUrl = 'https://www.googleapis.com/language/translate/v2?key=' +
                  CLOUD_API +
                  '&q=' + this.store.word +
                  '&target=zh';
    $.ajax({
      url: getUrl,
      method: 'GET',
      success: function(response) {
        this.successHandler(response);
      }.bind(this)
    });
  }

  successHandler(response) {
    var translated = response.data.translations[0].translatedText;
    this.store.translatedWord = translated;
    this.forceUpdate();
  }

  handleClick(e) {
    e.preventDefault();
    // responsiveVoice is from the cdn in index.html
    responsiveVoice.speak(this.store.translatedWord, 'Chinese Female');
  }

  // play an audio clip
  // onAudioPlay() {
  //   var audio = new Audio('https://s3.amazonaws.com/translate-hamster/audio/bottle1.m4a');
  //   audio.play();
  // }

  onDrop(acceptedFiles, rejectedFiles) {
    console.log('acceptedFiles', acceptedFiles);
    console.log('rejectedFiles', rejectedFiles);
    // convert file to base64 encoded
    var file = acceptedFiles[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = this.onSpeechTranlate.bind(this);
    reader.onerror = function (error) {
      console.log('Base64 encoded error: ', error);
    };
  }

  // translate audio with google speech
  onSpeechTranlate(e) {
    e.preventDefault();
    var body = {
      "config": {
          "encoding":"linear16",
          "sampleRate": 44100,
          "languageCode": this.store.languages.nativeLanguage
      },
      "audio": {
        "content": e.target.result.replace('data:audio/wav;base64,', '')
      }
    };
    $.post({
      url: 'https://speech.googleapis.com/v1beta1/speech:syncrecognize?key=' + CLOUD_API,
      data: JSON.stringify(body),
      contentType: 'application/json',
      success: function(data) {
        console.log('data', data);
        this.store.showUpload = 'Uploaded Sentence:';
        this.store.audioSentence = data.results[0].alternatives[0].transcript;
        this.translateAudioSentence();
      }.bind(this)
    });
  }

  translateAudioSentence() {
    console.log('this', this.store.languages.learnLanguage);
    var url = `https://translation.googleapis.com/language/translate/v2?key=${CLOUD_API}&q=${this.store.audioSentence}&target=${this.store.languages.learnLanguage}`;
    $.post ({
      url: url,
      contentType: 'application/json',
      success: function(data) {
        this.store.audioSentenceTranslation = data.data.translations[0].translatedText;
        console.log('translate', this.store.audioSentenceTranslation);
        this.forceUpdate();
      }.bind(this)
    });
  }

  render() {
    return (
      <div>
        <h1>{this.store.word}</h1>
        <h2>{this.store.translatedWord}</h2>
        <button onClick={this.handleClick.bind(this)}>Listen</button>
        <br/>
        <button onClick={this.onAudioPlay.bind(this)}>Play</button>
        <br/>
        <button onClick={this.translateAudioSentence.bind(this)}>translate test</button>
        <br/>
        <button>Record</button>
        <br/>
        <br/>
        <Dropzone onDrop={this.onDrop.bind(this)}>
          <div>Upload or drag an audio file here</div>
        </Dropzone>
        <div>{this.store.showUpload}</div>
        <div>{this.store.audioSentence}</div>
        <div>{this.store.audioSentenceTranslation}</div>
      </div>
    );
  }
}
