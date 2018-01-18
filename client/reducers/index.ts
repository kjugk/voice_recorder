import { combineReducers } from 'redux';
import { articles } from './articles';
import { player } from './player';
import { articleForm } from './articleForm';
import { recorder } from './recorder';
import { media } from './media';

const rootReducer = combineReducers({
  articles,
  articleForm,
  player,
  recorder,
  media
});

export default rootReducer;
