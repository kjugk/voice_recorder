import * as Constants from '../constants';

export const startRecording = () => {
  return {
    type: Constants.START_RECORDING,
    payload: {}
  };
};

export const stopRecording = () => {
  return {
    type: Constants.STOP_RECORDING,
    payload: {}
  };
};

export const resetRecorder = () => {
  return {
    type: Constants.RESET_RECORDER,
    payload: {}
  };
};
