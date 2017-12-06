import { asyncComponent } from 'react-async-component';

const FeaturesAsync = (process.env.ENABLE_WEBPACK_HMR !== 'true' ? asyncComponent({
  resolve: () => System.import(/* webpackChunkName: "features" */ './Features'),
}) : require('./Features').default);

export default FeaturesAsync;
