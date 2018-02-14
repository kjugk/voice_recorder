import { MediaState } from '../types';
import * as Constants from '../constants';

export enum MediaPermissionState {
  NOT_CHECKED,
  PERMITTED,
  DENIED
}

export const initialState: MediaState = {
  permission: MediaPermissionState.NOT_CHECKED,
  stream: undefined
};

export const media = (state: MediaState = initialState, action: any): MediaState => {
  switch (action.type) {
    case Constants.MIC_PREMISSION_SUCCESS:
      return {
        ...state,
        permission: MediaPermissionState.PERMITTED,
        stream: action.payload.stream
      };

    case Constants.MIC_PREMISSION_DENIED:
      return {
        ...state,
        permission: MediaPermissionState.DENIED
      };

    case Constants.RESET_FORM:
      return initialState;

    default:
      return state;
  }
};
