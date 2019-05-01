import { call, put } from 'redux-saga/effects';

import { fetchBoard } from '@/services/board';

export const board = {
  state: {},
  reducers: {
    set(state, { boardInfo }) {
      return { ...state, boardInfo };
    }
  },
  effects: {
    *fetchBoard({ id }) {
      console.log(`Fetching board #${id}`);
      const { board } = yield call(fetchBoard, { query: id });
      yield put({
        type: 'board/set',
        payload: { boardInfo: board }
      });
      yield put({
        type: 'list/fetchListOfBoard',
        payload: {
          boardId: id
        }
      });
    }
  }
};
