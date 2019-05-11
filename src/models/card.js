import { call, put } from 'redux-saga/effects';

import {
  fetchCardOfListFromBoard,
  editCardRequest,
  moveCardRequest,
  removeMemberRequest,
  addMemberRequest,
  deleteCardRequest,
  deleteLabelCardRequest,
  addCardRequest
} from '@/services/card';

export const card = {
  state: {
    cards: {},
    showDetail: false,
    subForm: { open: false, kind: null }, //  sub form of card detail , kind is addmem form, label form, deadline form ,....
    currentCard: {}
  },
  reducers: {
    putListCard(state, { card }) {
      console.log(card);
      // let newState = Object.assign({}, state);
      // for(let card_ in newState.cards){
      //   if(card.listId == card_){
      //     newState.cards[card_].push(card);
      //   }
      // }
      const { listId } = card;
      return {
        ...state,
        cards: {
          ...state.cards,
          [listId]: [...state.cards[card.listId], card]
        }
      };
    },
    put(state, { listId, cardInfo }) {
      return {
        ...state,
        cards: {
          ...state.cards,
          [listId]: cardInfo
        }
      };
    },
    putCurrentCard(state, { card }) {
      return {
        ...state,
        currentCard: card
      };
    },

    toggleModal(state, { card }) {
      //  toggle detail card form
      return {
        ...state,
        showDetail: !state.showDetail,
        currentCard: card
      };
    },
    toggleSubForm(state, { kind, open }) {
      //  toggle subform   form in card detail modal
      return {
        ...state,
        subForm: { open, kind }
      };
    },
    fromList(state, { cardItems }) {
      console.log(cardItems);
      return {
        ...state,
        cards: cardItems
      };
    }
  },
  effects: {
    *fetchCardOfListFromBoard({ boardId, listId }) {
      console.log(`Fetching card of list #${listId} from #${boardId}`);
      const { card } = yield call(fetchCardOfListFromBoard, {
        params: {
          board: boardId,
          list: listId
        }
      });
      yield put({
        type: 'card/put',
        payload: {
          listId,
          cardInfo: card
        }
      });
    },
    *editCardRequest({ body }) {
      console.log(`editting card request  `);
      const { card } = yield call(editCardRequest, {
        data: { body }
      });
      yield put({
        type: 'card/putCurrentCard',
        payload: {
          card
        }
      });
    },
    *addMemberRequest({ body }) {
      console.log(`add member card request  `);
      const { card } = yield call(addMemberRequest, {
        data: { body }
      });
      yield put({
        type: 'card/putCurrentCard',
        payload: {
          card
        }
      });
    },
    *removeMemberRequest({ body }) {
      console.log(`remove member card request  `);
      const { card } = yield call(removeMemberRequest, {
        data: { body }
      });
      yield put({
        type: 'card/putCurrentCard',
        payload: {
          card
        }
      });
    },
    *moveCardRequest({ body }) {
      console.log(`move card request  `);
      const { card } = yield call(moveCardRequest, {
        data: { body }
      });
      yield put({
        type: 'card/putCurrentCard',
        payload: {
          card
        }
      });
    },

    *deleteCardRequest({ _id, body }) {
      console.log(`delete card  #${_id}`);
      yield call(deleteCardRequest, {
        params: {
          _id: _id
        },
        data: { body }
      });
    },

    *deleteLabelCardRequest({ body }) {
      console.log(`delete label card   `);
      const { card } = yield call(deleteLabelCardRequest, {
        data: { body }
      });
      yield put({
        type: 'card/putCurrentCard',
        payload: {
          card
        }
      });
    },

    *addCardRequest({ title, ownerId, listId }) {
      console.log(`add card`);
      const { card } = yield call(addCardRequest, {
        data: {
          title,
          ownerId,
          listId
        }
      });
      console.log(card);
      yield put({
        type: 'card/putListCard',
        payload: {
          card
        }
      });
    }
  }
};
