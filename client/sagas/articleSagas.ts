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
  yield put(articleActions.receiveArticles(articles));
}

function* submitArticle() {
  const id = shortid.generate();
  const state = yield select();
  const { title, audio, duration } = state.articleForm;

  yield call(Api.saveArticle, id, title, audio, duration, new Date());
  yield put(formActions.completeSubmit());
  yield delay(50);
  yield put(appActions.setMessage('録音が完了しました!'));
}

function* deleteArticle(action: any) {
  const newArticles = yield call(Api.deleteArticle, action.payload.id);
  yield put(articleActions.deleteArticleComplete(newArticles));
  yield put(appActions.setMessage('削除しました！'));
}

export default function* articleSagas() {
  yield all([
    takeEvery(Constants.FETCH_ARTICLES, fetchArticles),
    takeEvery(Constants.SUBMIT_REQUEST, submitArticle),
    takeEvery(Constants.DELETE_ARTICLE, deleteArticle)
  ]);
}
