import { all, fork } from 'redux-saga/effects';

import articleSagas from './articleSagas';
import messageSagas from './messageSagas';
import playerSagas from './playerSagas';
import recorderSagas from './recorderSagas';

export default function* rootSaga() {
  yield all([
    fork(articleSagas),
    fork(playerSagas),
    fork(recorderSagas),
    fork(messageSagas)
  ]);
}
