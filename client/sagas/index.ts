import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as shortid from 'shortid';

import * as Constants from '../constants';
import * as articleActions from '../actions/articleActions';
import * as playerActions from '../actions/playerActions';
import * as formActions from '../actions/articleFormActions';
import * as mediaActions from '../actions/mediaActions';

import * as Api from '../lib/Api';
import * as Media from '../lib/Media';
import Player from '../lib/Player';
import * as RecordRTC from '../lib/Recorder';

const player = new Player();

function* getProgress() {
  player.play();

  while (true) {
    yield delay(250);
    yield put(playerActions.progress(player.getDuration()));

    const state = yield select();
    if (player.isEnded()) {
      player.stop();
      yield put(playerActions.stop());
      break;
    } else if (!state.player.isPlaying) {
      player.pause();
      break;
    }
  }
}

function* playTrack() {
  yield put(playerActions.play());
}

function* fetchArticles() {
  const articles = yield call(Api.fetchArticles);
  yield put(articleActions.receiveArticles(articles));
}

function* loadTrack(action: any) {
  player.stop();
  const duration = yield call(player.loadTrack, action.payload.id);

  yield put(playerActions.receiveTrack(duration));
  yield call(playTrack);
}

function* submitArticle() {
  const id = shortid.generate();
  const state = yield select();
  const { title, audio } = state.articleForm;

  yield call(Api.saveArticle, id, title, audio);
  yield put(formActions.completeSubmit());
}

function* requestMicPermission() {
  const stream = yield call(Media.requestMicPermission);
  yield put(mediaActions.successMicPermission());
  RecordRTC.build(stream);
}

function startRecording() {
  RecordRTC.startRecording();
}

function* stopRecording() {
  const blob = yield call(RecordRTC.stopRecording);
  yield put(formActions.receiveAudio(blob));
}

function* watchFetchArticles() {
  yield takeEvery(Constants.FETCH_ARTICLES, fetchArticles);
}

function* watchLoadTrack() {
  yield takeLatest(Constants.LOAD_TRACK, loadTrack);
}

function* watchPlay() {
  yield takeLatest(Constants.PLAY, getProgress);
}

function* watchSubmit() {
  yield takeEvery(Constants.SUBMIT_REQUEST, submitArticle);
}

function* watchMicPermissionRequest() {
  yield takeEvery(Constants.REQUEST_MIC_PERMISSION, requestMicPermission);
}

function* watchStartRecording() {
  yield takeEvery(Constants.START_RECORDING, startRecording);
}

function* watchStopRecording() {
  yield takeEvery(Constants.STOP_RECORDING, stopRecording);
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchArticles),
    fork(watchLoadTrack),
    fork(watchPlay),
    fork(watchSubmit),
    fork(watchMicPermissionRequest),
    fork(watchStartRecording),
    fork(watchStopRecording)
  ]);
}
