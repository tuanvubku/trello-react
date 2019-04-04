import { delay, call, put } from 'redux-saga/effects';

export const board = {
  state: {
    name: '',
    author: 'Board author'
  },
  reducers: {
    set(state, { name }) {
      return { ...state, name };
    }
  },
  effects: {
    *fetchBoard({ name }) {
      console.log(`Fetching board ${name}`);
      yield delay(5000);
      yield put({
        type: 'board/set',
        payload: {
          name
        }
      });
    },
    *changeBoardName({ name }) {
      console.log(`Change board name to ${name}`);
      yield delay(5000);
      yield put({
        type: 'board/set',
        payload: {
          name
        }
      });
    }
  }
};
