import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as Constants from '../constants';
import * as RecordRTC from '../lib/Recorder';
import * as formActions from '../actions/articleFormActions';
import * as mediaActions from '../actions/mediaActions';
import * as Media from '../lib/Media';

import * as recorderActions from '../actions/recorderActions';

import { getDurationFromFile } from '../lib/Player';

let stream: MediaStream;

function* getProgress() {
  let duration = 0;
  while (true) {
    yield put(recorderActions.receiveDuration(duration));
    yield delay(1000);
    duration += 1000;

    const state = yield select();
    if (state.recorder.recordingCompleted) {
      break;
    }
  }
}

function* requestMicPermission() {
  stream = yield call(Media.requestMicPermission);
  // TODO: errow handlings.
  yield put(mediaActions.successMicPermission(stream));
  RecordRTC.build(stream);
}

function* startRecording() {
  RecordRTC.startRecording();
  yield call(getProgress);
}

function* stopRecording() {
  const blob = yield call(RecordRTC.stopRecording);
  const duration = yield call(getDurationFromFile, blob);
  const size = blob.size;
  yield put(formActions.receiveAudio(blob, duration, size));
}

export default function* recorderSagas() {
  yield all([
    takeEvery(Constants.REQUEST_MIC_PERMISSION, requestMicPermission),
    takeEvery(Constants.START_RECORDING, startRecording),
    takeEvery(Constants.STOP_RECORDING, stopRecording)
  ]);
}
