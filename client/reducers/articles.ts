import { ArticlesState } from '../types';
import * as Constants from '../constants';

export const initialState: ArticlesState = {
  items: [],
  isFetching: false,
  selectedId: undefined,
  isInitialized: false
};

export const articles = (state: ArticlesState = initialState, action: any): ArticlesState => {
  switch (action.type) {
    case Constants.FETCH_ARTICLES:
      return { ...state, isFetching: true };

    case Constants.RECEIVE_ARTICLES:
      return { ...state, isInitialized: true, isFetching: false, items: action.payload.articles };

    case Constants.SELECT_ARTICLE:
      return { ...state, selectedId: action.payload.id };

    case Constants.DELETE_ARTICLE_COMPLETE:
      return { ...state, items: action.payload.articles};

    default:
      return state;
  }
};
