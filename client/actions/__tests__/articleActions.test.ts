import * as Types from '../../types';
import * as Constants from '../../constants';
import * as articleActions from '../articleActions';

describe('articleActions', () => {
  describe('fetchArticles', () => {
    it('should create an action to fetch articles.', () => {
      expect(articleActions.fetchArticles()).toEqual({
        type: Constants.FETCH_ARTICLES,
        payload: {}
      });
    });
  });

  describe('receiveArticles', () => {
    const articles: Types.ArticleItemState[] = [{
      id: '1',
      title: 'test',
      duration: 1,
      createdAt: new Date()
    }];

    it('should create an action to receive articles.', () => {
      expect(articleActions.receiveArticles(articles)).toEqual({
        type: Constants.RECEIVE_ARTICLES,
        payload: {
          articles
        }
      });
    });
  });

  describe('selectArticle', () => {
    it('should create an action to select article.', () => {
      expect(articleActions.selectArticle('1')).toEqual({
        type: Constants.SELECT_ARTICLE,
        payload: {
          id: '1'
        }
      });
    });
  });

  describe('deleteArticle', () => {
    it('should create an action to delete article.', () => {
      expect(articleActions.deleteArticle('1')).toEqual({
        type: Constants.DELETE_ARTICLE,
        payload: {
          id: '1'
        }
      });
    });
  });

  describe('deleteArticleComplete', () => {
    it('should create an action to delete article complete.', () => {
      expect(articleActions.deleteArticleComplete([])).toEqual({
        type: Constants.DELETE_ARTICLE_COMPLETE,
        payload: {
          articles: []
        }
      });
    });
  });
});
