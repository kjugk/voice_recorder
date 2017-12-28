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

let pos: number = 0;
function* watchProgress() {
  while (true) {
    yield delay(100);
    yield put(PlayerActions.progress((pos += 1000)));

    const state = yield select();
    // 終わってたら、breakする。
    if (!state.player.isPlaying) {
      break;
    }
  }
}

function* fetchArticles() {
  // TODO: call API.
  const articles = [{ id: 1, title: 'foo' }, { id: 2, title: 'bar' }, { id: 3, title: 'hoge' }];
  yield put(ArticleActions.receiveArticles(articles));
}

function* loadTrack(action: any) {
  const duration = yield call(lll, action.payload.url);
  yield put(PlayerActions.receiveTrack(duration));
  yield put(PlayerActions.play());
}

function* watchFetchArticles() {
  yield takeEvery(Constants.FETCH_ARTICLES, fetchArticles);
}

function* watchLoadTrack() {
  yield takeEvery(Constants.LOAD_TRACK, loadTrack);
}

function* watchPlay() {
  yield takeEvery(Constants.PLAY, watchProgress);
}

export default function* rootSaga() {
  yield all([fork(watchFetchArticles), fork(watchLoadTrack), fork(watchPlay)]);
}
