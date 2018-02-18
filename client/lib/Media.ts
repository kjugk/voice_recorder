let mstream: MediaStream;

export const requestMicPermission = (): Promise<MediaStream> => {
  return new Promise((resolve, reject) => {
    const constraints: MediaStreamConstraints = {
      video: false,
      audio: {
        autoGainControl: true,
        echoCancelation: true,
        noiseSuppression: true
      } as MediaTrackConstraints
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        mstream = stream;
        resolve(stream);
      })
      .catch(() => {
        reject();
      });
  });
};

export const killStream = () => {
  if (!mstream) {
    return;
  }

  mstream.getTracks().forEach((track) => track.stop());
};
