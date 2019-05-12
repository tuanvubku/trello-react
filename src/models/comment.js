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
    put(state, { comments }) {
      return {
        ...state,
        comments: comments
      };
    },

    putAfterEdit(state, { comment }) {
      // edit req and then call this
      var tem = [];
      for (var x of state.comments) {
        if (x._id === comment._id) tem.push(comment);
        else tem.push(x);
      }
      return { ...state, comments: tem };
    }
  },
  effects: {
    *fetchCommentOfCard({ cardId }) {
      console.log(`Fetching comment of card #${cardId} `);
      const { comments } = yield call(fetchCommentOfCard, {
        query: cardId
      });
      console.log(comments);
      yield put({
        type: 'comment/put',
        payload: {
          comments
        }
      });
    },
    *editCommentRequest({ body }) {
      console.log(`edit comment req `);
      var { comment } = yield call(editCommentRequest, {
        data: {
          body
        }
      });
      yield put({
        type: 'comment/putAfterEdit',
        payload: {
          comment
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
