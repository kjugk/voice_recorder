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

export const receiveDuration = (duration: number) => {
  return {
    type: Constants.RECEIVE_RECORD_DURATION,
    payload: {
      duration
    }
  };
};
