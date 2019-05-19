import { call, put } from 'redux-saga/effects';

import { fetchListOfBoard, addListOfBoard,editListOfBoard } from '@/services/list';

export const list = {
  state: {
    lists: []
  },
  reducers: {
    editList(state, { list }){
      return {
        lists: state.lists.map(x => x._id === list._id ? list : x)
      }
    },
    putList(state, { list }) {
      console.log('list model: ', list);
      return {
        lists: [...state.lists, list]
      };
    },
    set(state, { lists }) {
      // console.log(lists);
      return { ...state, lists };
    },
    clear(state, {  }) {
      return { ...state, lists:[] };
    },
  },
  effects: {
    *fetchListOfBoard({ boardId }) {
      console.log(`Fetching list of board #${boardId}`);
      const { lists: rawLists } = yield call(fetchListOfBoard, {
        query: boardId
      });

      const cardItems = rawLists.reduce(
        (items, val) => ({
          ...items,
          [val._id]: val.cards
        }),
        {}
      );
      const lists = rawLists.map(({ cards, ...x }) => x);

      yield put({
        type: 'list/set',
        payload: {
          lists
        }
      });
      yield put({
        type: 'card/fromList',
        payload: { cardItems }  
      });
    },
    *addListRequest({ name, ownerId, boardId }) {
      console.log(boardId);
      const { list } = yield call(addListOfBoard, {
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
      });
    },
    *editListRequest({_id, name, archived}){
      const {list} = yield call(editListOfBoard,{
        data: {
          _id,
          name,
          archived
        }
      });
      yield put({
        type: 'list/editList',
        payload: {
          list
        } 
      })
    }
  }
};
