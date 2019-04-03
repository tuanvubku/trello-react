import { combineReducers } from 'redux';
import boardReducer from '@/reducers/board';
import listReducer from '@/reducers/list';
import cardReducer from '@/reducers/card';

export default combineReducers({
  board: boardReducer,
  list: listReducer,
  card: cardReducer
});
