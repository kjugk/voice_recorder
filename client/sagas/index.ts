import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as Constants from '../constants';
import * as ArticleActions from '../actions/ArticleActions';

function* fetchArticles() {
  yield delay(2000);
  const articles = [{ id: 1, title: 'foo' }, { id: 2, title: 'bar' }, { id: 3, title: 'hoge' }];
  yield put(ArticleActions.receiveArticles(articles));
}

function* watchFetchArticles() {
  yield takeEvery(Constants.FETCH_ARTICLES, fetchArticles);
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchArticles)
  ]);
}
