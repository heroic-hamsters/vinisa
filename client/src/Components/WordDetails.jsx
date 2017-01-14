import React from 'react';
import $ from 'jquery';
import Config from '../../env/config.js';
import Dropzone from 'react-dropzone';
import MediaStreamRecorder from 'msr';
import helpers from '../helpers.js';
import ajax from '../lib/ajax.js';

export default class WordDetails extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.route.store;
    this.speechText = new SpeechSynthesisUtterance();
  }

  componentWillMount() {
    window.mediaRecorder = {};
  }

  handleListenClick(e) {
    e.preventDefault();
    this.speechText.text = this.store.translatedWord;
    this.speechText.lang = 'zh-CN';
    speechSynthesis.speak(this.speechText);
  }

  // play an audio clip
  // onAudioPlay() {
  //   var audio = new Audio('https://s3.amazonaws.com/translate-hamster/audio/bottle1.m4a');
  //   audio.play();
  // }

  onDrop(acceptedFiles, rejectedFiles) {
    // convert file to base64 encoded
    var file = acceptedFiles;
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
          "languageCode": this.store.nativeLanguageCode
      },
      "audio": {
        "content": e.target.result.replace('data:audio/wav;base64,', '')
      }
    };

    helpers.recognizeAudio(body, function(data) {
      this.store.showUpload = 'Uploaded Sentence:';
      this.store.audioSentence = data.results[0].alternatives[0].transcript;
      this.translateAudioSentence();
    }.bind(this));
  }

  translateAudioSentence() {
    helpers.translateText(this.store.audioSentence, this.store.learnLanguageCode, function(response) {
        this.store.audioSentenceTranslation = response.data.translations[0].translatedText;
        this.forceUpdate();
    }.bind(this));
  }

  captureUserMedia(mediaConstraints, successCallback, errorCallback) {
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
    console.log('captureUserMedia THIS:', this);
  }

  mediaConstraints = {
    audio: true
  };

  startRecording() {
    // $('#start-recording').disabled = true;
    // audiosContainer = document.getElementById('audios-container');
    // console.log('startRecording()');
    console.log('startRecording THIS:', this);
    var that = this;
    this.captureUserMedia(this.mediaConstraints, this.onMediaSuccess.bind(that), this.onMediaError);
  };

  stopRecording() {
    var mediaRecorder = window.mediaRecorder;
    // $('#stop-recording').disabled = true;
    mediaRecorder.stop();
    mediaRecorder.stream.stop();
    // $('.start-recording').disabled = false;
  };

  // mediaRecorder = this.store.mediaRecorder;

  onMediaSuccess(stream) {
    window.mediaRecorder = new MediaStreamRecorder(stream);
    var mediaRecorder = window.mediaRecorder;
    mediaRecorder.stream = stream;
    mediaRecorder.mimeType = 'audio/wav';
    mediaRecorder.audioChannels = 1;
    console.log('before mediaRecorder THIS: ', this);
    mediaRecorder.ondataavailable = function(blob) {
      $('#record-audio').html("<audio controls=''><source src=" + URL.createObjectURL(blob) + "></source></audio>");

      var url = (window.URL || window.webkitURL).createObjectURL(blob);
      var link = document.getElementById("save");
      link.href = url;
      link.download = 'output.wav';
      // link.download = filename || 'output.wav';
      console.log('onMediaSuccess THIS:', this);
      this.onDrop(blob);

    }.bind(this);

    var timeInterval = 360 * 1000;

    mediaRecorder.start(timeInterval);

    // $('#stop-recording').disabled = false;
  }

  onMediaError(e) {
    console.error('media error', e);
  }

  bytesToSize(bytes) {
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  }

  getTimeLength(milliseconds) {
    var data = new Date(milliseconds);
    return data.getUTCHours() + " hours, " + data.getUTCMinutes() + " minutes and " + data.getUTCSeconds() + " second(s)";
  }

  render() {
    return (
      <div className="word-details-container">
        <div className="word-details-box">

         <div className="translated-box">
            <h1 className="translated-word">{this.store.word} {this.store.translatedWord} <button id="general-button" onClick={this.handleListenClick.bind(this)}>Hear translated audio</button></h1>
         </div>
         
          <Dropzone className="audio-drop" onDrop={this.onDrop.bind(this)}>
            <div className="audio-drop-text">Upload or drag an audio file here</div>
          </Dropzone>
          <br/>

          <div className="record-stop-button">
            <button id="general-button" onClick={this.startRecording.bind(this)}>Record</button>
            <button id="general-button" onClick={this.stopRecording.bind(this)}>STOP</button>
            <a href="#" id="save">save</a>
          </div>
          
          <div id="record-audio"></div>
          <br/>
          <br/>
          <div>{this.store.showUpload}</div>
          <div>{this.store.audioSentence}</div>
          <div>{this.store.audioSentenceTranslation}</div>

        </div>
      </div>
    );
  }
}
