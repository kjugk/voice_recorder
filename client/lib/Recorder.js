module.exports.RECORDING_LIMIT = 600000;

const RecordRTC = require('recordrtc');
let recorder;

module.exports.build = (stream) => {
  recorder = RecordRTC(stream, { type: 'audio' });
  return recorder;
};

module.exports.startRecording = () => {
  if (!recorder) return;

  recorder.startRecording();
};

module.exports.stopRecording = () => {
  return new Promise((resolve, reject) => {
    if (!recorder) reject();

    recorder.stopRecording(function(audioURL) {
      resolve(recorder.getBlob());
      recorder.clearRecordedData();
      recorder.destroy();
    });
  });
};
