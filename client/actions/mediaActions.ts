import * as Constants from '../constants';

export const requestMicPermission = () => {
  return {
    type: Constants.REQUEST_MIC_PERMISSION,
    payload: {}
  };
};

export const successMicPermission = () => {
  return {
    type: Constants.MIC_PREMISSION_SUCCESS,
    payload: {}
  };
};
