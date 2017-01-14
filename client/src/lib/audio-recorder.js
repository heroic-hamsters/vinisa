import MediaStreamRecorder from 'msr';

exports.mediaRecorder = {};

exports.captureUserMedia = function(mediaConstraints, successCallback, errorCallback) {
  console.log('mediaConstraints: ', mediaConstraints);
  navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
  console.log('captureUserMedia THIS:', this);
}

exports.mediaConstraints = {
  audio: true
};

exports.startRecording = function(context) {
  // $('#start-recording').disabled = true;
  // audiosContainer = document.getElementById('audios-container');
  // console.log('startRecording()');
  // this = context;
  console.log('startRecording CONTEXT:', context);
  console.log('startRecording THIS:', this);
  // var that = this;

  context.captureUserMedia(context.mediaConstraints, context.onMediaSuccess, context.onMediaError);

  // var that = this;
  // this.captureUserMedia(this.mediaConstraints, this.onMediaSuccess.bind(that), this.onMediaError);
};

exports.stopRecording = function() {
  // var mediaRecorder = window.mediaRecorder;
  // console.log('STOP-RECORDING:', context);
  mediaRecorder.stop();
  mediaRecorder.stream.stop();
  // $('.start-recording').disabled = false;
};

// mediaRecorder = this.store.mediaRecorder;

exports.onMediaSuccess = function(stream) {
  mediaRecorder = new MediaStreamRecorder(stream);
  // window.mediaRecorder = new MediaStreamRecorder(stream);
  var mediaRecorder = window.mediaRecorder;
  mediaRecorder.stream = stream;
  mediaRecorder.mimeType = 'audio/wav';
  mediaRecorder.audioChannels = 1;
  console.log('before mediaRecorder THIS: ', this);
  mediaRecorder.ondataavailable = function(blob) {
    $('#record-audio').html("<audio controls=''><source src=" + URL.createObjectURL(blob) + "></source></audio>");

    var url = (window.URL || window.webkitURL).createObjectURL(blob);
    var tempFileName = `${Date.now()}.wav`;

    var link = document.getElementById("save");
    link.href = url;
    link.download = tempFileName;

    // link.download = filename || 'output.wav';
    // console.log('onMediaSuccess THIS:', this);

    // var file =
    // url.lastModifiedDate = new Date();
    // url.name = link.download;

    var file = new File([blob], tempFileName);
    this.store.audioFile = file;
    console.log('file:', file);

    this.onDrop(blob);
  }.bind(this);

  var timeInterval = 360 * 1000;

  mediaRecorder.start(timeInterval);

  // $('#stop-recording').disabled = false;
}

// uploadAudioFile() {
//   var formData = new FormData();
//   formData.append('audiofile', this.store.audioFile);
//   formData.append('Content-Type', 'multipart/form-data');
//
//   $.ajax({
//     url: '/api/upload',
//     method: 'POST',
//     data: formData,
//     processData: false,  // tell jQuery not to convert to form data
//     contentType: false,  // tell jQuery not to set contentType
//     success: function(response) {
//       console.log(response);
//     }.bind(this)
//   });
// }

exports.onMediaError = function(e) {
  console.error('media error', e);
}

exports.bytesToSize = function(bytes) {
  var k = 1000;
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

exports.getTimeLength = function(milliseconds) {
  var data = new Date(milliseconds);
  return data.getUTCHours() + " hours, " + data.getUTCMinutes() + " minutes and " + data.getUTCSeconds() + " second(s)";
}
