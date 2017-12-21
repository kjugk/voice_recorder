import { ArticlesState } from '../types';

export const initialState: ArticlesState = {
  items: []
};

export const articles = (state: ArticlesState = initialState, action: any): ArticlesState => {
  switch (action.type) {
    default:
      return state;
  }
};
