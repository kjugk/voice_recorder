import * as types from '../types';
import * as Constants from '../constants';

export const initialState: types.ArticleFormState = {
  title: '',
  submitted: false,
  audio: undefined,
  duration: 0,
  size: 0
};

export const articleForm = (
  state: types.ArticleFormState = initialState,
  action: any
): types.ArticleFormState => {
  switch (action.type) {
    case Constants.CHANGE_TITLE:
      return { ...state, title: action.payload.newTitle };

    case Constants.RECEIVE_AUDIO_DATA:
      return {
        ...state,
        audio: action.payload.audio,
        duration: action.payload.duration,
        size: action.payload.size
      };

    case Constants.SUBMIT_COMPLETE:
      return { ...state, submitted: true };

    case Constants.RESET_FORM:
      return initialState;

    default:
      return state;
  }
};
