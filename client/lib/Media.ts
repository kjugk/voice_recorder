export const requestMicPermission = () => {
  // TODO: getUserMediaが実装されていないブラウザの場合の処理
  return navigator.mediaDevices.getUserMedia({ audio: true, video: false });
};
