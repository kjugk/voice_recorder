import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as Constants from '../constants';
import * as formActions from '../actions/articleFormActions';
import * as mediaActions from '../actions/mediaActions';
import * as messageActions from '../actions/messageActions';
import * as recorderActions from '../actions/recorderActions';
import * as Media from '../lib/Media';
import * as Recorder from '../lib/Recorder';
import { getDurationFromFile } from '../lib/Player';
import * as moment from 'moment';

function* getProgress() {
  let diff = 0;
  const startTime = moment(new Date());

  while (true) {
    yield put(recorderActions.receiveDuration(diff));
    yield delay(1000);
    diff = moment(new Date()).diff(startTime);

    if (diff >= Recorder.RECORDING_LIMIT) {
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
    Recorder.build(stream);
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
  Recorder.startRecording();
  yield call(getProgress);
}

function* stopRecording() {
  const blob = yield call(Recorder.stopRecording);
  const duration = yield call(getDurationFromFile, blob);

  yield call(Media.killStream);
  yield delay(1000);
  yield put(recorderActions.completeRecording());
  yield put(formActions.receiveAudioData(blob, duration, blob.size));
}

function* resetRecorder() {
  yield call(Media.killStream);
  yield call(Recorder.stopRecording);
}

export default function* recorderSagas() {
  yield all([
    takeEvery(Constants.MIC_PERMISSION_REQUESTED, requestMicPermission),
    takeEvery(Constants.START_RECORDING, startRecording),
    takeEvery(Constants.STOP_RECORDING, stopRecording),
    takeEvery(Constants.RESET_RECORDER, resetRecorder)
  ]);
}
