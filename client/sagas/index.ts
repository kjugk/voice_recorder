import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as Constants from '../constants';
import * as ArticleActions from '../actions/ArticleActions';
import * as PlayerActions from '../actions/PlayerActions';
import { LOAD_TRACK } from '../constants';

const context: AudioContext = new AudioContext();
let buffer: AudioBuffer;
let source: AudioBufferSourceNode;
let startOffset: number = 0;
let startTime: number;

function lll(url: string) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      context.decodeAudioData(xhr.response, (decodedData) => {
        buffer = decodedData;
        resolve(buffer.duration);
      });
    };
    xhr.send();
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
    yield put(PlayerActions.progress((getDuration())));

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
  // TODO: call API.
  const articles = [{ id: 1, title: 'foo' }, { id: 2, title: 'bar' }, { id: 3, title: 'hoge' }];
  yield put(ArticleActions.receiveArticles(articles));
}

function* loadTrack(action: any) {
  yield call(stop);
  const duration = yield call(lll, action.payload.url);

  yield put(PlayerActions.receiveTrack(duration));
  yield call(playTrack);
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

export default function* rootSaga() {
  yield all([fork(watchFetchArticles), fork(watchLoadTrack), fork(watchPlay)]);
}
