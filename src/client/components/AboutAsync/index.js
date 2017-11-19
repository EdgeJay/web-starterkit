import { asyncComponent } from 'react-async-component';

const AboutAsync = asyncComponent({
  resolve: () => System.import(/* webpackChunkName: "about" */ './About'),
});

export default AboutAsync;
