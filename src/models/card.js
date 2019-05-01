import { call, put } from 'redux-saga/effects';

import { fetchCardOfListFromBoard } from '@/services/card';

export const card = {
  state: {
    cards: {}
  },
  reducers: {
    put(state, { listId, cardInfo }) {
      return {
        ...state,
        cards: {
          ...state.cards,
          [listId]: cardInfo
        }
      };
    }
  },
  effects: {
    *fetchCardOfListFromBoard({ boardId, listId }) {
      console.log(`Fetching card of list #${listId} from #${boardId}`);
      const { card } = yield call(fetchCardOfListFromBoard, {
        params: {
          board: boardId,
          list: listId
        }
      });
      yield put({
        type: 'card/put',
        payload: {
          listId,
          cardInfo: card
        }
      });
    }
  }
};
