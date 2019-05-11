import { navigate } from 'gatsby';
import { delay, call, put } from 'redux-saga/effects';

import { login, fetchCurrentUser, fetchUserBoard } from '@/services/user';
import { setUser } from '@/utils/auth';
import { LOGIN_OK } from '@/utils/return_messages';

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
    myboard(state, { boards }) {
      return { ...state, board: boards };
    },
    clear(state) {
      setUser({});
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
      const {
        user: { role, ...user }
      } = yield call(fetchCurrentUser);
      yield put({
        type: 'user/set',
        payload: {
          status: true,
          user,
          role: [role]
        }
      });
      yield put({
        type: 'user/fetchUserBoard',
        payload: { userId: user._id }
      });
    },
    *fetchUserBoard({ userId }) {
      const { boards } = yield call(fetchUserBoard, { query: userId });
      yield put({
        type: 'user/myboard',
        payload: { boards }
      });
    },
    *login({ username, password }) {
      console.log(`Login using ${username}:${password}`);
      const {
        status,
        user: { role, ...user },
        token
      } = yield call(login, { data: { username, password } });
      if (status === LOGIN_OK) {
        yield call(setUser, { user, role: [role], token });
        yield put({
          type: 'user/set',
          payload: { status, user, role: [role] }
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
