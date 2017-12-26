import * as Types from '../types';
import * as Constants from '../constants';

const initialState: Types.PlayerState = {
  isPlaying: false,
  isLoading: false,
  duration: 0
};

export const player = (state: Types.PlayerState = initialState, action: any): Types.PlayerState => {
  switch (action.type) {
    case Constants.LOAD_TRACK:
      return { ...state, isLoading: true };

    case Constants.RECEIVE_TRACK:
      return { ...state, duration: action.payload.duration, isLoading: false };

    case Constants.PLAY:
      return { ...state, isPlaying: true };

    case Constants.PAUSE:
      return { ...state, isPlaying: false };

    default:
      return state;
  }
};
