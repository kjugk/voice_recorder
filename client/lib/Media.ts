export const requestMicPermission = (): Promise<MediaStream> => {
  const constraints: MediaStreamConstraints = {
    video: false,
    audio: {
      autoGainControl: true,
      echoCancelation: true,
      noiseSuppression: true
    } as MediaTrackConstraints
  };

  return navigator.mediaDevices.getUserMedia(constraints);
};
