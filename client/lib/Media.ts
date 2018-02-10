export const requestMicPermission = (): Promise<MediaStream> => {
  // TODO: getUserMediaが実装されていないブラウザの場合の処理
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
