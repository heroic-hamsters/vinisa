import $ from 'jquery';
import Config from '../env/config.js';


var detectLabels = function(request, callback) {
  $.post({
    url: 'https://vision.googleapis.com/v1/images:annotate?key=' + Config['CLOUD_API'],
    data: JSON.stringify(request),
    contentType: 'application/json'
  }).done(function(data) {
    callback(data);
  });
};

var translateText = function(text, target, callback) {
  var url = 'https://www.googleapis.com/language/translate/v2?key=' +
                  Config['CLOUD_API'] +
                  '&q=' + text +
                  '&target=' + target;
  $.ajax({
    url: url,
    method: 'GET',
    success: function(data) {
      callback(data);
    }
  });
};

var recognizeAudio = function(request, callback) {
  $.post({
    url: 'https://speech.googleapis.com/v1beta1/speech:syncrecognize?key=' + Config['CLOUD_API'],
    data: JSON.stringify(request),
    contentType: 'application/json',
    success: function(data) {
      callback(data);
    }
  });
};

module.exports = {
  detectLabels: detectLabels,
  translateText: translateText,
  recognizeAudio: recognizeAudio
};