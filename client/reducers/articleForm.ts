import { ArticleFormState } from './../types/states';
import * as Constants from '../constants';

export const initialState: ArticleFormState = {
  title: ''
};

export const articleForm = (state: ArticleFormState = initialState, action: any): ArticleFormState => {
  switch (action.type) {
    case Constants.CHANGE_TITLE:
      return { ...state, title: action.payload.title };

    default:
      return state;
  }
};
