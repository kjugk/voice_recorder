import { PLAY, PAUSE } from '../constants';

export const play = () => {
  return {
    type: PLAY,
    payload: {}
  };
};

export const pause = () => {
  return {
    type: PAUSE,
    payload: {}
  };
};
