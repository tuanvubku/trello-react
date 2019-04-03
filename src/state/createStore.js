import { init } from '@rematch/core';
import sagaPlugin from 'rematch-saga';

import * as models from '@/models';

const createStore = () =>
  init({
    models,
    plugins: [sagaPlugin()]
  });

export default createStore;
