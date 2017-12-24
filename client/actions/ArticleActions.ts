import { SELECT_ARTICLE } from '../constants';

export const selectArticle = (id: number) => {
  return {
    payload: {
      id
    },
    type: SELECT_ARTICLE
  };
};
