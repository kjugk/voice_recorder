import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as shortid from 'shortid';

import * as Constants from '../constants';
import * as ArticleActions from '../actions/ArticleActions';
import * as PlayerActions from '../actions/PlayerActions';
import * as FormActions from '../actions/articleFormActions';
import * as MediaActions from '../actions/mediaActions';

import * as Api from '../lib/Api';
import * as Media from '../lib/Media';
import Player from '../lib/Player';
const player = new Player();

function* getProgress() {
  player.play();

  while (true) {
    yield delay(250);
    yield put(PlayerActions.progress(player.getDuration()));

    const state = yield select();
    if (player.isEnded()) {
      player.stop();
      yield put(PlayerActions.stop());
      break;
    } else if (!state.player.isPlaying) {
      player.pause();
      break;
    }
  }
}

function* playTrack() {
  yield put(PlayerActions.play());
}

function* fetchArticles() {
  const articles = yield call(Api.fetchArticles);
  yield put(ArticleActions.receiveArticles(articles));
}

function* loadTrack(action: any) {
  player.stop();
  const duration = yield call(player.loadTrack, action.payload.url);

  yield put(PlayerActions.receiveTrack(duration));
  yield call(playTrack);
}

function* submitArticle() {
  const id = shortid.generate();
  const state = yield select();
  const { title } = state.articleForm;

  yield call(Api.saveArticle, id, title);
  yield put(FormActions.completeSubmit());
}

function* requestMicPermission() {
  const stream = yield call(Media.requestMicPermission);
  yield put(MediaActions.successMicPermission());
  console.log(stream);
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

export default function* rootSaga() {
  yield all([
    fork(watchFetchArticles),
    fork(watchLoadTrack),
    fork(watchPlay),
    fork(watchSubmit),
    fork(watchMicPermissionRequest)
  ]);
}
