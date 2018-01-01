import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as Constants from '../constants';
import * as ArticleActions from '../actions/ArticleActions';
import * as PlayerActions from '../actions/PlayerActions';
import * as FormActions from '../actions/articleFormActions';

import * as API from '../lib/API';
import * as shortid from 'shortid';

const context: AudioContext = new AudioContext();
let buffer: AudioBuffer;
let source: AudioBufferSourceNode;
let startOffset: number = 0;
let startTime: number;

function lll(url: string) {
  return new Promise((resolve) => {
    API.getTrack(url).then((response: any) => {
      context.decodeAudioData(response, (decodedData: AudioBuffer) => {
        buffer = decodedData;
        resolve(buffer.duration);
      });
    });
  });
}

function play() {
  startTime = context.currentTime;

  source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0, startOffset % buffer.duration);
}

function pause() {
  if (!source) {
    return;
  }
  startOffset = context.currentTime - startTime;
  source.stop(0);
}

function stop() {
  if (!source) {
    return;
  }
  startOffset = 0;
  source.stop(0);
}

function getDuration(): number {
  return startOffset + (context.currentTime - startTime);
}

function isEnded(): boolean {
  return getDuration() >= buffer.duration;
}

function* watchProgress() {
  yield call(play);

  while (true) {
    yield delay(250);
    yield put(PlayerActions.progress(getDuration()));

    const state = yield select();
    if (isEnded()) {
      yield call(stop);
      yield put(PlayerActions.stop());
      break;
    } else if (!state.player.isPlaying) {
      yield call(pause);
      break;
    }
  }
}

function* playTrack() {
  yield put(PlayerActions.play());
}

function* fetchArticles() {
  const articles = yield call(API.fetchArticles);
  yield put(ArticleActions.receiveArticles(articles));
}

function* loadTrack(action: any) {
  yield call(stop);
  const duration = yield call(lll, action.payload.url);

  yield put(PlayerActions.receiveTrack(duration));
  yield call(playTrack);
}

function* submitArticle() {
  const id = shortid.generate();
  const state = yield select();
  const { title } = state.articleForm;

  yield call(API.saveArticle, id, title);
  yield put(FormActions.completeSubmit());
}

function* watchFetchArticles() {
  yield takeEvery(Constants.FETCH_ARTICLES, fetchArticles);
}

function* watchLoadTrack() {
  yield takeLatest(Constants.LOAD_TRACK, loadTrack);
}

function* watchPlay() {
  yield takeLatest(Constants.PLAY, watchProgress);
}

function* watchSubmit() {
  yield takeEvery(Constants.SUBMIT_REQUEST, submitArticle);
}

export default function* rootSaga() {
  yield all([fork(watchFetchArticles), fork(watchLoadTrack), fork(watchPlay), fork(watchSubmit)]);
}
