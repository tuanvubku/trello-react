import { call, put } from 'redux-saga/effects';

import { fetchListOfBoard, addListRequest } from '@/services/list';

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

    *addListRequest({name, ownerId, boardId}){
      console.log("add List request model: ",name);
      const {list} = yield call(addListRequest,{
        data: {
          name,
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
