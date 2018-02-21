module.exports.RECORDING_LIMIT = 600000;

const RecordRTC = require('recordrtc');
let recordRTC;

module.exports.build = (stream) => {
  recordRTC = RecordRTC(stream, { type: 'audio' });
  return recordRTC;
};

module.exports.startRecording = () => {
  if (!recordRTC) return;

  recordRTC.startRecording();
};

module.exports.stopRecording = () => {
  return new Promise((resolve, reject) => {
    if (!recordRTC) reject();

    recordRTC.stopRecording(function(audioURL) {
      resolve(recordRTC.getBlob());
      recordRTC.clearRecordedData();
      recordRTC.destroy();
    });
  });
};
