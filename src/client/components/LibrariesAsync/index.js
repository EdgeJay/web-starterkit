import { asyncComponent } from 'react-async-component';

const LibrariesAsync =
  process.env.ENABLE_WEBPACK_HMR !== 'true'
    ? asyncComponent({
        resolve: () => System.import(/* webpackChunkName: "libraries" */ './Libraries'),
      })
    : require('./Libraries').default;

export default LibrariesAsync;
