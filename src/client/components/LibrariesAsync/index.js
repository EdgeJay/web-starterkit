import { asyncComponent } from 'react-async-component';

const LibrariesAsync = asyncComponent({
  resolve: () => System.import(/* webpackChunkName: "libraries" */ './Libraries'),
});

export default LibrariesAsync;
