import { navigate } from 'gatsby';
import { delay, call, put } from 'redux-saga/effects';

import { login, fetchCurrentUser, fetchUserBoard } from '@/services/user';
import { setUser } from '@/utils/auth';

export const user = {
  state: {
    status: undefined,
    user: {},
    role: [],
    board: []
  },

  reducers: {
    set(state, { status, user, role }) {
      return {
        ...state,
        status,
        user,
        role
      };
    },
    myboard(state, { board }) {
      return { ...state, board };
    },
    clear(state) {
      setUser();
      return {
        status: undefined,
        user: {},
        role: [],
        board: []
      };
    }
  },
  effects: {
    *fetchCurrentUser() {
      console.log('Fetch current User');
      const data = yield call(fetchCurrentUser);
      yield put({
        type: 'user/set',
        payload: data
      });
    },
    *fetchUserBoard() {
      const { board } = yield call(fetchUserBoard);
      yield put({
        type: 'user/myboard',
        payload: { board }
      });
    },
    *login({ username, password }) {
      console.log(`Login using ${username}:${password}`);
      const response = yield call(login, { data: { username, password } });
      if (response.status === 'ok') {
        yield call(setUser, response);
        yield put({
          type: 'user/set',
          payload: response
        });
        navigate('/');
      }
    },
    *logout({ name }) {
      console.log(`Logout`);
      yield delay(1000);
      yield put({
        type: 'user/clear',
        payload: {}
      });
    },
    *register(payload) {
      yield delay(2000);
    }
  }
};
