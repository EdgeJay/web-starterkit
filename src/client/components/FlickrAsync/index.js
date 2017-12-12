import { asyncComponent } from 'react-async-component';

const FlickrAsync =
  process.env.ENABLE_WEBPACK_HMR !== 'true'
    ? asyncComponent({
        resolve: () => System.import(/* webpackChunkName: "flickr" */ './Flickr'),
      })
    : require('./Flickr').default;

export default FlickrAsync;
