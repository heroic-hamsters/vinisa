import React from 'react';
import $ from 'jquery';
import Config from '../../env/config.js';
import Dropzone from 'react-dropzone';
import ajax from '../lib/ajax.js';
import MediaStreamRecorder from 'msr';

export default class WordDetails extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.route.store;
  }

  componentWillMount() {
    window.mediaRecorder = {};
  }

  componentDidMount() {
    var getUrl = 'https://www.googleapis.com/language/translate/v2?key=' +
                  Config['CLOUD_API'] +
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
      url: 'https://speech.googleapis.com/v1beta1/speech:syncrecognize?key=' + Config['CLOUD_API'],
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
    var url = `https://translation.googleapis.com/language/translate/v2?key=${Config['CLOUD_API']}&q=${this.store.audioSentence}&target=${this.store.languages.learnLanguage}`;
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

  captureUserMedia(mediaConstraints, successCallback, errorCallback) {
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
    console.log('In captureUserMedia');
  }

  mediaConstraints = {
    audio: true
  };

  startRecording() {
    // $('#start-recording').disabled = true;
    // audiosContainer = document.getElementById('audios-container');
    console.log('startRecording()');
    this.captureUserMedia(this.mediaConstraints, this.onMediaSuccess, this.onMediaError);
  };

  stopRecording() {
    // this.store.mediaRecorder = new MediaStreamRecorder(stream);
    // window.mediaRecorder = this.store.mediaRecorder;
    var mediaRecorder = window.mediaRecorder;
    // $('#stop-recording').disabled = true;
    mediaRecorder.stop();
    mediaRecorder.stream.stop();
    // $('.start-recording').disabled = false;
  };

  // mediaRecorder = this.store.mediaRecorder;

  onMediaSuccess(stream) {
    // console.log(this);
    window.mediaRecorder = new MediaStreamRecorder(stream);
    var mediaRecorder = window.mediaRecorder;
    // mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.stream = stream;
    mediaRecorder.mimeType = 'audio/wav';
    mediaRecorder.audioChannels = 1;
    mediaRecorder.ondataavailable = function(blob) {
      $('#record-audio').html("<audio controls=''><source src=" + URL.createObjectURL(blob) + "></source></audio>");

      var url = (window.URL || window.webkitURL).createObjectURL(blob);
      var link = document.getElementById("save");
      link.href = url;
      link.download = 'output.wav';
      // link.download = filename || 'output.wav';

      console.log(blob);
    };

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
      <div>
        <h1>{this.store.word}</h1>
        <h2>{this.store.translatedWord}</h2>
        <button onClick={this.handleClick.bind(this)}>Listen</button>
        <br/>
        <button onClick={this.onAudioPlay.bind(this)}>Play</button>
        <br/>
        <button onClick={this.translateAudioSentence.bind(this)}>translate test</button>
        <br/>
        <button onClick={this.startRecording.bind(this)}>Record</button>
        <button onClick={this.stopRecording.bind(this)}>STOP</button>
        <a href="#" id="save">save</a>
        <div id="record-audio"></div>
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
