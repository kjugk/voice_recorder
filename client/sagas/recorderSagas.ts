import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as Constants from '../constants';
import * as RecordRTC from '../lib/Recorder';
import * as formActions from '../actions/articleFormActions';
import * as mediaActions from '../actions/mediaActions';
import * as Media from '../lib/Media';

import {getDurationFromFile} from '../lib/Player';

function* requestMicPermission() {
  const stream = yield call(Media.requestMicPermission);
  // TODO: errow handlings.
  yield put(mediaActions.successMicPermission());
  RecordRTC.build(stream);
}

function startRecording() {
  RecordRTC.startRecording();
}

function* stopRecording() {
  const blob = yield call(RecordRTC.stopRecording);
  const duration = yield call(getDurationFromFile, blob);
  yield put(formActions.receiveAudio(blob, duration));
}

export default function* recorderSagas() {
  yield all([
    takeEvery(Constants.REQUEST_MIC_PERMISSION, requestMicPermission),
    takeEvery(Constants.START_RECORDING, startRecording),
    takeEvery(Constants.STOP_RECORDING, stopRecording)
  ]);
}
