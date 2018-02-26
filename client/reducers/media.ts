import { MediaState } from '../types';
import * as Constants from '../constants';
import * as types from '../types';

export const initialState: MediaState = {
  permission: types.MediaPermissionState.NOT_CHECKED,
  stream: undefined
};

export const media = (state: MediaState = initialState, action: any): MediaState => {
  switch (action.type) {
    case Constants.MIC_PREMISSION_ACCEPTED:
      return {
        ...state,
        permission: types.MediaPermissionState.PERMITTED,
        stream: action.payload.stream
      };

    case Constants.MIC_PREMISSION_DENIED:
      return {
        ...state,
        permission: types.MediaPermissionState.DENIED
      };

    case Constants.MIC_NOT_SUPPORTED:
      return {
        ...state,
        permission: types.MediaPermissionState.NOT_SUPPORTED
      };

    case Constants.RESET_FORM:
      return initialState;

    default:
      return state;
  }
};
