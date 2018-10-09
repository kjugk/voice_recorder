let mstream: MediaStream;
const constraints: MediaStreamConstraints = {
  video: false,
  audio: {
    autoGainControl: true,
    echoCancelation: true,
    noiseSuppression: true
  } as MediaTrackConstraints
};

export class NotSupportedError extends Error {
  get message() {
    return 'Sorry, your browser doesn\'t support recording functions.';
  }
}

export const requestMicPermission = (): Promise<MediaStream> => {
  return new Promise((resolve, reject) => {
    if (!navigator.mediaDevices) {
      reject(new NotSupportedError());
      return;
    }

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        mstream = stream;
        resolve(stream);
      })
      .catch(() => reject());
  });
};

export const killStream = () => {
  if (!mstream) {
    return;
  }

  mstream.getTracks().forEach((track) => track.stop());
};
