import { createStore as reduxCreateStore } from 'redux';

import reducers from '@/reducers';

const initialState = {
  board: {},
  list: {},
  card: {},
  sample: 'Sample store test'
};

const createStore = () => reduxCreateStore(reducers, initialState);

export default createStore;
