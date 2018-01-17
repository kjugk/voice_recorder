import { combineReducers } from 'redux';
import { articles } from './articles';
import { player } from './player';
import { articleForm } from './articleForm';
import { recorder } from './recorder';

const rootReducer = combineReducers({
  articles,
  articleForm,
  player,
  recorder
});

export default rootReducer;
