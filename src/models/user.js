import { navigate } from 'gatsby';
import { delay, call, put } from 'redux-saga/effects';

import { fetchCurrent, login } from '@/services/user';
import { setUser } from '@/utils/auth';

export const user = {
  state: {
    status: undefined,
    user: {},
    role: []
  },

  reducers: {
    set(state, { status, user, role }) {
      setUser({ user, role });
      return Object.assign({}, state, {
        ...state,
        status,
        user,
        role
      });
    },
    clear(state) {
      setUser({ user: {}, role: [] });
      return {
        status: undefined,
        user: {},
        role: []
      };
    }
  },
  effects: {
    *fetchCurrent(payload) {
      console.log('Fetch current User');
      yield delay(1000);
      const data = yield call(fetchCurrent, {});
      yield put({
        type: 'user/set',
        payload: data
      });
    },
    *login({ username, password }) {
      console.log(`Login using ${username}:${password}`);
      yield delay(2000);
      const response = yield call(login, { username, password });
      if (response.status === 'ok') {
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
