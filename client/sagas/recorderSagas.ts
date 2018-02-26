import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as Constants from '../constants';
import * as formActions from '../actions/articleFormActions';
import * as mediaActions from '../actions/mediaActions';
import * as messageActions from '../actions/messageActions';
import * as recorderActions from '../actions/recorderActions';
import * as Media from '../lib/Media';
import * as RecordRTC from '../lib/Recorder';
import { getDurationFromFile } from '../lib/Player';

function* getProgress() {
  let duration = 0;

  while (true) {
    yield put(recorderActions.receiveDuration(duration));
    yield delay(1000);
    duration += 1000;

    if (duration >= RecordRTC.RECORDING_LIMIT) {
      yield put(recorderActions.stopRecording());
      break;
    }

    const state = yield select();
    if (state.recorder.recordingCompleted) {
      break;
    }
  }
}

function* requestMicPermission() {
  try {
    const stream = yield call(Media.requestMicPermission);
    RecordRTC.build(stream);
    yield put(mediaActions.acceptMicPermission(stream));
  } catch (e) {
    if (e instanceof Media.NotSupportedError) {
      yield put(mediaActions.receiveNotSupported());
    } else {
      yield put(mediaActions.denyMicPermission());
    }
  }
}

function* startRecording() {
  RecordRTC.startRecording();
  yield call(getProgress);
}

function* stopRecording() {
  const blob = yield call(RecordRTC.stopRecording);
  const duration = yield call(getDurationFromFile, blob);

  yield call(Media.killStream);
  yield delay(1000);
  yield put(recorderActions.completeRecording());
  yield put(formActions.receiveAudioData(blob, duration, blob.size));
}

function* resetRecorder() {
  yield call(Media.killStream);
  yield call(RecordRTC.stopRecording);
}

export default function* recorderSagas() {
  yield all([
    takeEvery(Constants.MIC_PERMISSION_REQUESTED, requestMicPermission),
    takeEvery(Constants.START_RECORDING, startRecording),
    takeEvery(Constants.STOP_RECORDING, stopRecording),
    takeEvery(Constants.RESET_RECORDER, resetRecorder)
  ]);
}
