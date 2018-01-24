import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as Constants from '../constants';

import * as articleActions from '../actions/articleActions';
import * as formActions from '../actions/articleFormActions';
import * as Api from '../lib/Api';
import * as shortid from 'shortid';

function* fetchArticles() {
  const articles = yield call(Api.fetchArticles);
  yield put(articleActions.receiveArticles(articles));
}

function* submitArticle() {
  const id = shortid.generate();
  const state = yield select();
  const { title, audio } = state.articleForm;

  yield call(Api.saveArticle, id, title, audio);
  yield put(formActions.completeSubmit());
}

function* deleteArticle(action: any) {
  const newArticles = yield call(Api.deleteArticle, action.payload.id);
  yield put(articleActions.deleteArticleComplete(newArticles));
}

export default function* articleSagas() {
  yield all([
    takeEvery(Constants.FETCH_ARTICLES, fetchArticles),
    takeEvery(Constants.SUBMIT_REQUEST, submitArticle),
    takeEvery(Constants.DELETE_ARTICLE, deleteArticle)
  ]);
}
