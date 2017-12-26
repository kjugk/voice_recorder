import * as Constants from '../constants';

export const play = () => {
  return {
    type: Constants.PLAY,
    payload: {}
  };
};

export const pause = () => {
  return {
    type: Constants.PAUSE,
    payload: {}
  };
};

export const loadTrack = (url: string) => {
  return {
    type: Constants.LOAD_TRACK,
    payload: {}
  };
};
