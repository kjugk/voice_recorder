const RECORDING_LIMIT = 600000;
module.exports.RECORDING_LIMIT = RECORDING_LIMIT

const RecordRTC = require('recordrtc');
let recorder;

module.exports.isOverLimit = (duration) => {
  return duration > RECORDING_LIMIT;
}

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
    if (!recorder) return;

    recorder.stopRecording(function(audioURL) {
      resolve(recorder.getBlob());
      recorder.clearRecordedData();
      recorder.destroy();
    });
  });
};
