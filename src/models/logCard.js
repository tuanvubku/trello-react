import { call, put } from 'redux-saga/effects';

import { fetchLogOfCard } from '@/services/logCard';

export const logCard = {
  state: {
    logCards: [],
    currentLogCard: {}
  },
  reducers: {
    put(state, { logCard }) {
      return {
        ...state,
        logCards: logCard
      };
    }
  },
  effects: {
    *fetchLogOfCard({ cardId }) {
      console.log(`Fetching log  of card #${cardId} `);
      const { logCard } = yield call(fetchLogOfCard, {
        params: {
          cardId
        }
      });
      yield put({
        type: 'logCard/put',
        payload: {
          logCard
        }
      });
    }
  }
};
