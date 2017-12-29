import * as Constants from '../constants';
import * as Types from '../types';

export const fetchArticles = () => {
  return {
    type: Constants.FETCH_ARTICLES,
    payload: {}
  };
};

export const receiveArticles = (articles: Types.ArticleItemState[]) => {
  return {
    type: Constants.RECEIVE_ARTICLES,
    payload: {
      articles
    }
  };
};

export const selectArticle = (id: number) => {
  return {
    type: Constants.SELECT_ARTICLE,
    payload: {
      id
    }
  };
};
