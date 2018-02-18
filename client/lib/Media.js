const getUserMedia = require('get-user-media-promise');

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
      .then((stream) => {
        resolve(stream);
      })
      .catch(() => {
        // TODO check error type(reject or not supported)
        reject();
      });
  });
};
