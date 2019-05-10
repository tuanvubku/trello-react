import { call, put } from 'redux-saga/effects';

import {
  fetchCommentOfCard,
  editCommentRequest,
  addCommentRequest
} from '@/services/comment';

export const comment = {
  state: {
    comments: []
  },
  reducers: {
    put(state, { comment }) {
      return {
        ...state,
        comments: comment
      };
    }
  },
  effects: {
    *fetchCommentOfCard({ cardId }) {
      console.log(`Fetching comment of card #${cardId} `);
      const { comment } = yield call(fetchCommentOfCard, {
        params: {
          cardId
        }
      });
      yield put({
        type: 'comment/put',
        payload: {
          comment
        }
      });
    },
    *editCommentRequest({ body }) {
      console.log(`edit comment req `);
      yield call(editCommentRequest, {
        data: {
          body
        }
      });
    },
    *addCommentRequest({ body }) {
      console.log(`add comment req `);
      yield call(addCommentRequest, {
        data: {
          body
        }
      });
    }
  }
};
