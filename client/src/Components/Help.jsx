import React from 'react';

const Help = () => (
  <div className="help-box">
    <h1>How to use this app</h1>
    <div className="help-text">
      Upload or take a picture, and our app will tell you what it thinks is in the picture.
    </div>
    <div className="help-text">
      Choose a word (or just search it) and it will take you to the translation of the word, along with any other sentences
      that users have uploaded for that word.
    </div>
    <div className="help-text">
      If you would like, contribute your own sentence to that word!
    </div>
  </div>
);

export default Help;