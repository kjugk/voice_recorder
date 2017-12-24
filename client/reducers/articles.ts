import { ArticlesState } from '../types';

export const initialState: ArticlesState = {
  items: [{ id: 1, title: 'foo' }, { id: 2, title: 'bar' }, { id: 3, title: 'hoge' }],
  selectedId: undefined
};

export const articles = (state: ArticlesState = initialState, action: any): ArticlesState => {
  switch (action.type) {
    case 'SELECT_ARTICLE':
      return { ...state, selectedId: action.payload.id };
    default:
      return state;
  }
};
