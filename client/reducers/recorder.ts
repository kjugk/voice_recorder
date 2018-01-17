import * as Types from '../types';
import * as Constants from '../constants';

const initialState: Types.RecorderState = {
  isRecording: false,
  recordingCompleted: false
};

export const recorder = (state = initialState, action: any): Types.RecorderState => {
  switch (action.type) {
    case Constants.START_RECORDING:
      return { ...state, isRecording: true };

    case Constants.STOP_RECORDING:
      return { ...state, isRecording: false, recordingCompleted: true };

    case Constants.RESET_RECORDER:
      return initialState;

    default:
      return state;
  }
};
