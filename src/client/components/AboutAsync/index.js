import { asyncComponent } from 'react-async-component';

const AboutAsync = (process.env.ENABLE_WEBPACK_HMR !== 'true' ? asyncComponent({
  resolve: () => System.import(/* webpackChunkName: "about" */ './About'),
}) : require('./About').default);

export default AboutAsync;
