import { navigate } from 'gatsby';
import { delay, call, put } from 'redux-saga/effects';

import {
  login,
  signUp,
  fetchCurrentUser,
  fetchUserBoard,
  fetchAllUsername
} from '@/services/user';
import { setUser } from '@/utils/auth';
import {
  LOGIN_OK,
  REGISTER_OK,
  USER_EXIST,
  USER_INCORRECT,
  QUERY_OK
} from '@/utils/return_messages';

export const user = {
  state: {
    status: undefined,
    user: {},
    role: [],
    board: [],
    allUsername: [], // contain all username to use for add member form
    error: {} // error of user : login , register  to show alert
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
    myboardSingle(state, { boards }) {  
      var tem=state.board;
      tem.push(boards); 
      return { ...state, board: tem };  
    }, 
    setUsernames(state, { usernames }) {
      return { ...state, allUsername: usernames };
    },
    setError(state, { error }) {
      console.log('vo');
      return { ...state, error };
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
      const { status, user } = yield call(fetchCurrentUser);
      if (status === QUERY_OK) {
        yield put({
          type: 'user/set',
          payload: {
            status: true,
            user,
            role: [user.role]
          }
        });
        yield put({
          type: 'user/fetchUserBoard',
          payload: { userId: user._id }
        });
      } else {
        console.log('chả làm gì');
      }
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
      const { status, user, token } = yield call(login, {
        data: { username, password }
      });
      if (status === LOGIN_OK) {
        yield call(setUser, { user, role: [user.role], token });
        yield put({
          type: 'user/set',
          payload: { status, user, role: [user.role] }
        });
        navigate('/');
      } else if (status === USER_INCORRECT) {
        console.log(status);
        yield put({
          type: 'user/setError',
          payload: { error: { alertAccount: status } }
        });
      }
    },
    *signUp({ username, password, email }) {
      console.log(`Sign up using ${username}:${password} and email ${email}`);
      const { status, user, token } = yield call(signUp, {
        data: { username, password, email }
      });
      if (status === REGISTER_OK) {
        yield call(setUser, { user, role: [user.role], token });
        yield put({
          type: 'user/set',
          payload: { status, user, role: [user.role] }
        });
        navigate('/');
      } else if (status === USER_EXIST) {
        yield put({
          type: 'user/setError',
          payload: { error: { alertUsername: status } }
        });
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
    },
    *fetchAllUsername() {
      // call api query all username in db
      console.log('fetchUserMember');
      const { usernames } = yield call(fetchAllUsername);
      yield put({
        type: 'user/setUsernames',
        payload: { usernames }
      });
    }
  }
};
