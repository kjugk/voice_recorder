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

export const selectArticle = (id: string) => {
  return {
    type: Constants.SELECT_ARTICLE,
    payload: {
      id
    }
  };
};

export const deleteArticle = (id: string) => {
  return {
    type: Constants.DELETE_ARTICLE,
    payload: {
      id
    }
  };
};

export const deleteArticleComplete = (articles: Types.ArticleItemState[]) => {
  return {
    type: Constants.DELETE_ARTICLE_COMPLETE,
    payload: {
      articles
    }
  };
};
