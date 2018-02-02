import { all, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as Constants from '../constants';
import * as appActions from '../actions/appActions';

function* clearMessage() {
  yield delay(3000);
  yield put(appActions.clearMessage());
}

export default function* appSagas() {
  yield all([
    takeLatest(Constants.SET_MESSAGE, clearMessage)
  ]);
}
