import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import recorderSagas from './recorderSagas';
import playerSagas from './playerSagas';
import articleSagas from './articleSagas';

export default function* rootSaga() {
  yield all([
    fork(articleSagas),
    fork(playerSagas),
    fork(recorderSagas)
  ]);
}
