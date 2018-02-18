const mediaDevices =
  navigator.mediaDevices ||
  (navigator.mozGetUserMedia || navigator.webkitGetUserMedia
    ? {
        getUserMedia: function(c) {
          return new Promise(function(y, n) {
            (navigator.mozGetUserMedia || navigator.webkitGetUserMedia).call(navigator, c, y, n);
          });
        }
      }
    : null);

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

    mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        resolve(stream);
      })
      .catch(() => {
        // TODO check error type(reject or not supported)
        reject();
      });
  });
};
