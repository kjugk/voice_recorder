import * as Constants from '../constants';
import { FSA } from '../types';

export type PlayerAction = FSA<LoadTrackAction | ReceiveTrackAction>;

export interface LoadTrackAction {
  url: string;
}

export interface ReceiveTrackAction {
  duration: number;
}

export const play = (): FSA<{}> => {
  return {
    type: Constants.PLAY,
    payload: {}
  };
};

export const pause = (): FSA<{}> => {
  return {
    type: Constants.PAUSE,
    payload: {}
  };
};

export const loadTrack = (url: string): FSA<LoadTrackAction> => {
  return {
    type: Constants.LOAD_TRACK,
    payload: {
      url
    }
  };
};

export const receiveTrack = (duration: number): FSA<ReceiveTrackAction> => {
  return {
    type: Constants.RECEIVE_TRACK,
    payload: {
      duration
    }
  };
};
