import React from 'react';
import $ from 'jquery';
import CLOUD_API from '../../env/config.js';

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

  render() {
    return (
      <div>
        <h1>{this.store.word}</h1>
        <h2>{this.store.translatedWord}</h2>
        <button onClick={this.handleClick.bind(this)}>Listen</button>
        <br/>
        <button>Upload sample sentences here</button>
      </div>
    );
  }
}