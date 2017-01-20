import React from 'react';
import $ from 'jquery';
import Dropzone from 'react-dropzone';
import MediaStreamRecorder from 'msr';
import ajax from '../lib/ajax.js';
import { observer } from 'mobx-react';
import AppStore from './AppStore.jsx';

@observer
export default class WordDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sentences: null,
      startedRecording: null,
      audioSentence: null,
      audioSentenceTranslation: null,
      audioFile: null,
      recognizingAudio: "",
      sentenceUploaded: null,
      sentencedSaved: null
    };
  }

  componentWillMount() {
    window.mediaRecorder = {};
    this.speechText = new SpeechSynthesisUtterance();
    this.setState({
      audioSentence: null,
      audioSentenceTranslation: null
    })
  }

  componentDidMount() {
    // Get all sentences related to a word
    ajax.getSentences(AppStore.translatedWord, function(sentences) {
      var learnSentences = [];
      var urls = [];
      var nativeSentences = [];

      sentences.learnSentences.forEach( lSentence => {
        learnSentences.push(lSentence.text);
        urls.push(lSentence.url);
      });

      sentences.nativeSentences.forEach( nSentence => {
        nativeSentences.push(nSentence.translation);
      });

      var sentenceObj = {
        nativeSentences: nativeSentences,
        learnSentences: learnSentences,
        urls: urls
      };

      this.setState({
        sentences: sentenceObj
      });
    }.bind(this));
  }

  // When a user clicks listen, use speechSynthesis to say the word
  handleListenClick(e) {
    e.preventDefault();
    this.speechText.text = AppStore.translatedWord;
    this.speechText.lang = AppStore.learnLanguageSpeechCode;
    speechSynthesis.speak(this.speechText);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    // convert file to base64 encoded
    var file = acceptedFiles;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = this.onSpeechTranslate.bind(this);
    reader.onerror = function (error) {
      console.log('Base64 encoded error: ', error);
    };
  }

  // translate audio with google speech
  onSpeechTranslate(e) {
    e.preventDefault();

    var body = {
      "config": {
          "encoding":"linear16",
          "sampleRate": 44100,
          "languageCode": AppStore.nativeLanguageSpeechCode
      },
      "audio": {
        "content": e.target.result.replace('data:audio/wav;base64,', '')
      }
    };

    ajax.recognizeAudio(body, function(data) {
      if (data.text) {
        this.setState({
          audioSentence: data.text,
          audioSentenceTranslation: data.translatedText,
          recognizingAudio: null
        })
      } else {
        this.setState({
          audioSentence: data,
          recognizingAudio: null
        })
      }
    }.bind(this));
  }

  // Beginning of audio audio recorder
  captureUserMedia(mediaConstraints, successCallback, errorCallback) {
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
  }

  mediaConstraints = {
    audio: true
  };

  startRecording() {
    this.setState({
      startedRecording: true,
      audioSentence: null,
      audioSentenceTranslation: null,
      sentenceUploaded: null,
      sentenceSaved: null
    });

    var that = this;
    this.captureUserMedia(this.mediaConstraints, this.onMediaSuccess.bind(that), this.onMediaError);
  };

  stopRecording() {
    this.setState({
      startedRecording: null,
      recognizingAudio: true
    });

    var mediaRecorder = window.mediaRecorder;
    mediaRecorder.stop();
    mediaRecorder.stream.stop();
  };


  onMediaSuccess(stream) {
    window.mediaRecorder = new MediaStreamRecorder(stream);
    var mediaRecorder = window.mediaRecorder;
    mediaRecorder.stream = stream;
    mediaRecorder.mimeType = 'audio/wav';
    mediaRecorder.audioChannels = 1;
    mediaRecorder.sampleRate = 44100;
    mediaRecorder.ondataavailable = function(blob) {
      $('#record-audio').html("<audio controls=''><source src=" + URL.createObjectURL(blob) + "></source></audio>");

      var url = (window.URL || window.webkitURL).createObjectURL(blob);
      var tempFileName = `${Date.now()}.wav`;

      var link = document.getElementById("save");
      link.href = url;
      link.download = tempFileName;

      this.onDrop(blob);

      var file = new File([blob], tempFileName);
      this.setState({
        audioFile: file
      });
    }.bind(this);

    var timeInterval = 360 * 1000;

    mediaRecorder.start(timeInterval);
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
  // End of audio audio record

  uploadAudioFile() {
    var formData = new FormData();
    formData.append('audiofile', this.state.audioFile);
    formData.append('Content-Type', 'multipart/form-data');
    formData.append('acl', 'public-read');

    $.ajax({
      url: '/api/upload',
      method: 'POST',
      data: formData,
      processData: false,  // tell jQuery not to convert to form data
      contentType: false,  // tell jQuery not to set contentType
      success: function(response) {
        this.addSentenceToDb(AppStore.word, this.state.audioSentence, this.state.audioSentenceTranslation, response.location);
      }.bind(this)
    });
  }

  // When user uploads a sentence, add it to the database
  addSentenceToDb(word, audioSentence, sentenceTranslation, url) {
    ajax.addSentences(word, audioSentence, sentenceTranslation, url);
    this.setState({
      sentenceUploaded: true
    });
  }

  // When a user saves a sentence, add association to database
  handleSaveSentence(url) {
    ajax.saveSentence(url);
    this.setState({
      sentenceSaved: true
    });
  }

  render() {
    return (
      <div className="word-details-container">

        <div className="word-details-box">

          <div className="translated-box">

            <div className="original-word">{AppStore.word}</div>
            <div className="translated-word">{AppStore.translatedWord}</div>

          </div>

          <div className="word-details-button">
            <button className="general-button" onClick={this.handleListenClick.bind(this)}>Hear translated audio</button>
          </div>

        </div>

        <div className="audio-drop-and-record">
          <Dropzone className="audio-drop" onDrop={this.onDrop.bind(this)}>
            <div className="audio-drop-text">Upload or drag an audio file here</div>
          </Dropzone>

          <div className="record-stop-button">
            <button className="general-button" onClick={this.startRecording.bind(this)}>Record</button>
            <button className="general-button" onClick={this.stopRecording.bind(this)}>STOP</button>
            <button className="general-button" onClick={this.uploadAudioFile.bind(this)}>Upload</button>
            <button className="general-button"><a href="#" id="save">Download</a></button>
            <div>
              {this.state.startedRecording && 
                <div className="red-dot"></div>
              }
              {this.state.sentenceUploaded &&
                <div>Uploaded!</div>
              }
              {this.state.sentenceSaved &&
                <div>Sentence Saved!</div>
              }
            </div>
          </div>


          <div className="recorded-audio-box">
            <div id="record-audio"></div>
          </div>

        </div>

        <div className="recorded-sentence">
            {this.state.audioSentence &&
              <div>
                Your recorded sentence:
                <div>{this.state.audioSentence}</div>
                <div>{this.state.audioSentenceTranslation}</div>
              </div>
            }
            {this.state.recognizingAudio &&
              <div className="recognition-loading">Recognizing audio and getting translation... <img src="http://mupit.icm.jhu.edu/MuPIT_Interactive/images/load.gif" style={{width: '60px'}} /></div>
            }
        </div>


        <div className="related-sentences-box">
          <h3>Sentences uploaded by users: </h3>
          <ul id="related-sentences">
            {this.state.sentences &&
              this.state.sentences.learnSentences.map( (sentence, index) => (
                <li className="related-sentences" key={index}>
                  <div>{this.state.sentences.nativeSentences[index]}</div>
                  <div>{sentence}</div>
                  <div><audio src={this.state.sentences.urls[index]} controls="controls" /></div>
                  <button className="general-button" onClick={this.handleSaveSentence.bind(this, this.state.sentences.urls[index])}>Save Sentence</button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}
