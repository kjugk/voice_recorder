import { PlayerState } from '../types';
import * as Constants from '../constants';

const initialState: PlayerState = {
  isPlaying: false,
  isLoading: false
};

export const player = (state: PlayerState = initialState, action: any): PlayerState => {
  switch (action.type) {
    case Constants.PLAY:
      return { ...state, isPlaying: true, isLoading: false };

    case Constants.PAUSE:
      return { ...state, isPlaying: false };

    default:
      return state;
  }
};
