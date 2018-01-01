import { combineReducers } from 'redux';
import { articles } from './articles';
import { player } from './player';
import { articleForm } from './articleForm';

const rootReducer = combineReducers({
  articles,
  articleForm,
  player
});

export default rootReducer;
