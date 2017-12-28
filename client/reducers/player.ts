import * as Types from '../types';
import * as Constants from '../constants';

import { PlayerAction, ReceiveTrackAction } from '../actions/PlayerActions';

const initialState: Types.PlayerState = {
  isPlaying: false,
  isLoading: false,
  duration: 0,
  curPos: 0
};

export const player = (state: Types.PlayerState = initialState, action: any): Types.PlayerState => {
  switch (action.type) {
    case Constants.LOAD_TRACK:
      return { ...initialState, isLoading: true };

    case Constants.RECEIVE_TRACK:
      return {
        ...state,
        duration: action.payload.duration,
        isLoading: false
      };

    case Constants.PLAY:
      return { ...state, isPlaying: true };

    case Constants.PAUSE:
      return { ...state, isPlaying: false };

    case Constants.STOP:
      return { ...state, isPlaying: false };

    case Constants.RECEIVE_PROGRESS:
      return { ...state, curPos: action.payload.curPos };

    default:
      return state;
  }
};
