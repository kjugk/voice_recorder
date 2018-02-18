const getUserMedia = require('get-user-media-promise');
let stream;

export const requestMicPermission = () => {
  return new Promise((resolve, reject) => {
    const constraints = {
      video: false,
      audio: {
        autoGainControl: true,
        echoCancelation: true,
        noiseSuppression: true
      }
    };

    getUserMedia(constraints)
      .then((_stream) => {
        stream = _stream;
        resolve(stream);
      })
      .catch(() => {
        // TODO check error type(reject or not supported)
        reject();
      });
  });
};

export const killStream = () => {
  if(!stream) { return; }

  stream.getTracks().forEach((track) => track.stop());
};
