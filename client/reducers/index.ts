import { combineReducers } from 'redux';
import { articles } from './articles';
import { player } from './player';

const rootReducer = combineReducers({
  articles,
  player
});

export default rootReducer;
