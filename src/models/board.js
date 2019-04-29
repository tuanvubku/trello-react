import { call, put } from 'redux-saga/effects';

import { fetchBoard } from '@/services/board';

export const board = {
  state: {},
  reducers: {
    set(state, boardInfo) {
      return boardInfo;
    }
  },
  effects: {
    *fetchBoard({ id }) {
      console.log(`Fetching board #${id}`);
      const data = yield call(fetchBoard, { query: id });
      yield put({
        type: 'board/set',
        payload: {
          data
        }
      });
    }
  }
};
