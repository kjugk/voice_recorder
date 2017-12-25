import { PlayerState } from '../types';
import { PLAY, PAUSE } from '../constants';

const initialState: PlayerState = {
  isPlaying: false,
  isLoading: false
};

export const player = (state: PlayerState = initialState, action: any): PlayerState => {
  switch (action.type) {
    case PLAY:
      return { ...state, isPlaying: true, isLoading: false };

    case PAUSE:
      return { ...state, isPlaying: false };

    default:
      return state;
  }
};
