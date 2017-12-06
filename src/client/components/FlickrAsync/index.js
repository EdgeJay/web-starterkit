import { asyncComponent } from 'react-async-component';

const FlickrAsync = asyncComponent({
  resolve: () => System.import(/* webpackChunkName: "flickr" */ './Flickr'),
});

export default FlickrAsync;
