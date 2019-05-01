import { call, put } from 'redux-saga/effects';

import { fetchListOfBoard } from '@/services/list';

export const list = {
  state: {
    lists: []
  },
  reducers: {
    set(state, { lists }) {
      return { ...state, lists };
    }
  },
  effects: {
    *fetchListOfBoard({ boardId }) {
      console.log(`Fetching list of board #${boardId}`);
      const { list } = yield call(fetchListOfBoard, {
        params: { board: boardId }
      });
      yield put({
        type: 'list/set',
        payload: {
          lists: list
        }
      });

      // yield all(
      //   list.map(({ _id: listId }) =>
      //     put({
      //       type: 'card/fetchCardOfListFromBoard',
      //       payload: {
      //         boardId,
      //         listId
      //       }
      //     })
      //   )
      // );
    },
    *fetchListInfo({ id }) {
      console.log(`Fetching list #${id}`);
      // const { list } = yield call(fetchListInfo, {
      // query: id
      // });
    }
  }
};
