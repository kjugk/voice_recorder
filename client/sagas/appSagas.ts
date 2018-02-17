import { all, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as Constants from '../constants';
import * as messageActions from '../actions/messageActions';

function* clearMessage() {
  yield delay(2500);
  yield put(messageActions.clearMessage());
}

export default function* appSagas() {
  yield all([
    takeLatest(Constants.SET_MESSAGE, clearMessage)
  ]);
}
