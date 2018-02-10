import * as Types from '../types';
import * as Constants from '../constants';

const initialState: Types.RecorderState = {
  isRecording: false,
  recordingCompleted: false,
  duration: 0
};

export const recorder = (state = initialState, action: any): Types.RecorderState => {
  switch (action.type) {
    case Constants.START_RECORDING:
      return { ...state, isRecording: true };

    case Constants.STOP_RECORDING:
      return { ...state, isRecording: false, recordingCompleted: true };

    case Constants.RECEIVE_RECORD_DURATION:
      return { ...state, duration: action.payload.duration };

    case Constants.RESET_RECORDER:
      return initialState;

    default:
      return state;
  }
};
