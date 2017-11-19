import { asyncComponent } from 'react-async-component';

const FeaturesAsync = asyncComponent({
  resolve: () => System.import(/* webpackChunkName: "features" */ './Features'),
});

export default FeaturesAsync;
