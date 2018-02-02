import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as Constants from '../constants';
import * as playerActions from '../actions/playerActions';

import Player from '../lib/Player';
const player = new Player();

const PROGRESS_INTERVAL = 250;

function* getProgress() {
  player.play();

  while (true) {
    yield delay(PROGRESS_INTERVAL);
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

function* loadTrack(action: any) {
  player.stop();
  const duration = yield call(player.loadTrack, action.payload.id);

  yield put(playerActions.receiveTrack(duration));
  yield put(playerActions.play());
}

function resetPlayer() {
  player.stop();
}

export default function* playerSagas() {
  yield all([
    takeLatest(Constants.LOAD_TRACK, loadTrack),
    takeLatest(Constants.PLAY, getProgress),
    takeLatest(Constants.RESET_PLAYER, resetPlayer)
  ]);
}
