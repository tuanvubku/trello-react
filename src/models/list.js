import { select, call, put } from 'redux-saga/effects';

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
    },
    *addList({ listTitle }) {
      // const { _id: boardId } = yield select(({ board }) => board.boardInfo);
      const {
        board: {
          boardInfo: { _id: boardId }
        },
        user: {
          user: { _id: userId }
        }
      } = yield select();
      console.log(
        `User #${userId} add new list '${listTitle}' to board #${boardId}`
      );
    }
  }
};
