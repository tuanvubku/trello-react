import { init } from '@rematch/core';
// import sagaPlugin from 'rematch-saga';
import createLoadingPlugin from '@rematch/loading';

// temporary solution until rematch-saga support @rematch/loading
import createSagaPlugin from '@/state/sagaPlugin';
import * as models from '@/models';

const loading = createLoadingPlugin({});
const saga = createSagaPlugin();

const createStore = () =>
  init({
    models,
    plugins: [loading, saga]
  });

export default createStore;
