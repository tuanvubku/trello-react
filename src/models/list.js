import { select, call, put } from 'redux-saga/effects';

import { fetchListOfBoard, addListOfBoard } from '@/services/list';

export const list = {
  state: {
    lists: []
  },
  reducers: {
    putList(state, {list}){
      console.log("list model: ",list);
      return {
        lists: [...state.lists,list]
      }
    },
    set(state, { lists }) {
      console.log(lists)
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

    *addListRequest({listTitle, ownerId, boardId}) {
      const {list} = yield call(addListOfBoard,{
        data: {
          listTitle,
          ownerId,
          boardId
        }
      });

      yield put({
        type: 'list/putList',
        payload: {
          list
        }
      })
    }

  }
};
