import { MediaState } from '../types';
import * as Constants from '../constants';

export const initialState: MediaState = {
  micPremitted: false,
  isPermissionChecked: false
};

export const media = (state: MediaState = initialState, action: any): MediaState => {
  switch (action.type) {
    case Constants.MIC_PREMISSION_SUCCESS:
      return { ...state, isPermissionChecked: true, micPremitted: true };

    default:
      return state;
  }
};
