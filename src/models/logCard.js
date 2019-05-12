import { call, put } from 'redux-saga/effects';

import { fetchLogOfCard } from '@/services/logCard';

export const logCard = {
  state: {
    logCards: [],
    currentLogCard: {}
  },
  reducers: {
    put(state, { logCards }) {
      return {
        ...state,
        logCards: logCards
      };
    }
  },
  effects: {
    *fetchLogOfCard({ cardId }) {
      console.log(`Fetching log  of card #${cardId} `);
      const { logCards } = yield call(fetchLogOfCard, {
        query: `${cardId}/logCards`
      });
      yield put({
        type: 'logCard/put',
        payload: {
          logCards
        }
      });
    }
  }
};
