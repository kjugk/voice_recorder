import { MediaState } from '../types';
import * as Constants from '../constants';

export const initialState: MediaState = {
  micPremitted: false,
  stream: undefined
};

export const media = (state: MediaState = initialState, action: any): MediaState => {
  switch (action.type) {
    case Constants.MIC_PREMISSION_SUCCESS:
      return { ...state, micPremitted: true, stream: action.payload.stream};

    case Constants.RESET_FORM:
      return { ...state, micPremitted: false, stream: undefined};

    default:
      return state;
  }
};
