import * as Constants from '../constants';

export const requestMicPermission = () => {
  return {
    type: Constants.MIC_PERMISSION_REQUESTED,
    payload: {}
  };
};

export const acceptMicPermission = (stream: MediaStream) => {
  return {
    type: Constants.MIC_PREMISSION_ACCEPTED,
    payload: {
      stream
    }
  };
};

export const denyMicPermission = () => {
  return {
    type: Constants.MIC_PREMISSION_DENIED,
    payload: {}
  };
};
