import { call, put } from 'redux-saga/effects';

import {
  fetchBoard,
  addBoardRequest,
  editBoardRequest,
  addMemberRequest,
  removeMemberRequest,
  deleteBoardRequest
} from '@/services/board';

export const board = {
  state: {
    showFormAddMem: false
  },
  reducers: {
    set(state, { boardInfo }) {
      return { ...state, boardInfo };
    },
    toggleshowFormAddMem(state, { value }) {
      return { ...state, showFormAddMem: value };
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
    },
    *addBoardRequest(payload) {
      const { board } = yield call(addBoardRequest, {
        data: payload
      });

      yield put({
        type: 'user/myboardSingle',
        payload: { newBoard: board }
      });
    },
    *editBoardRequest(payload) {
      const { board } = yield call(editBoardRequest, {
        data: payload
      });
      yield put({
        type: 'board/set',
        payload: { boardInfo: board }
      });
    },
    *addMemberRequest({ body }) {
      console.log(`add member board request`);
      const { board } = yield call(addMemberRequest, {
        data: { body }
      });
      yield put({
        type: 'board/set',
        payload: {
          boardInfo: board
        }
      });
    },
    *removeMemberRequest({ body }) {
      console.log(`remove member card request`);
      const { board } = yield call(removeMemberRequest, {
        data: { body }
      });
      yield put({
        type: 'board/set',
        payload: {
          boardInfo: board
        }
      });
    },
    *deleteBoardRequest({ _id, body }) {
      console.log(`delete board  #${_id}`);
      yield call(deleteBoardRequest, {
        params: {
          _id: _id
        },
        data: { body }
      });
      yield put({
        type: 'user/removeBoard',
        payload: {
          _id
        }
      });
    }
  }
};
