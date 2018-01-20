import { ArticleFormState } from './../types/states';
import * as Constants from '../constants';

export const initialState: ArticleFormState = {
  title: '',
  submitted: false,
  audio: undefined
};

export const articleForm = (
  state: ArticleFormState = initialState,
  action: any
): ArticleFormState => {
  switch (action.type) {
    case Constants.CHANGE_TITLE:
      return { ...state, title: action.payload.title };

    case Constants.RECEIVE_AUDIO:
      return { ...state, audio: action.payload.audio };

    case Constants.SUBMIT_COMPLETE:
      return { ...state, submitted: true };

    case Constants.RESET_FORM:
      return initialState;

    default:
      return state;
  }
};
