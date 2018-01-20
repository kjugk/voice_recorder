const RecordRTC = require('recordrtc');
let recordRTC;

module.exports.build = function(stream) {
  recordRTC = RecordRTC(stream, { type: 'audio' });
};

module.exports.startRecording = function() {
  if (!recordRTC) return;
  recordRTC.startRecording();
};

module.exports.stopRecording = function() {
  return new Promise((resolve, reject) => {
    if (!recordRTC) reject();

    recordRTC.stopRecording(function(audioURL) {
      resolve(recordRTC.getBlob());
    });
  });
};
