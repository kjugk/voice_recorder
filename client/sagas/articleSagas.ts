import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as Constants from '../constants';

import * as articleActions from '../actions/articleActions';
import * as formActions from '../actions/articleFormActions';
import * as Api from '../lib/Api';
import * as shortid from 'shortid';
import * as appActions from '../actions/appActions';

function* fetchArticles() {
  const articles = yield call(Api.fetchArticles);
  yield delay(1000);
  yield put(articleActions.receiveArticles(articles));
}

function* submitArticle() {
  const id = shortid.generate();
  const state = yield select();
  const { title, audio, duration } = state.articleForm;

  const articles = yield call(Api.saveArticle, id, title, audio, duration, new Date());
  yield put(articleActions.receiveArticles(articles));
  yield put(formActions.completeSubmit());
  yield delay(50);
  yield put(appActions.setMessage('REC completed!'));
}

function* deleteArticle(action: any) {
  const newArticles = yield call(Api.deleteArticle, action.payload.id);
  yield put(articleActions.deleteArticleComplete(newArticles));
  yield put(appActions.setMessage('Delete completed.'));
}

export default function* articleSagas() {
  yield all([
    takeEvery(Constants.FETCH_ARTICLES, fetchArticles),
    takeEvery(Constants.SUBMIT_REQUEST, submitArticle),
    takeEvery(Constants.DELETE_ARTICLE, deleteArticle)
  ]);
}
