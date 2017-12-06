const { fetch } = require('fetch-ponyfill')();

export default class ApiController {
  static async postValidateCSRF(ctx) {
    ctx.json({
      body: {
        validated: true,
      },
    });
  }

  static async getFlickrRecents(ctx) {
    const perPage = ctx.request.query.per_page || 10;
    const page = ctx.request.query.page || 1;
    const flickrKey = process.env.FLICKR_KEY;
    const url = `https://api.flickr.com/services/rest?method=flickr.photos.getRecent&api_key=${flickrKey}&format=json&per_page=${perPage}&page=${page}&nojsoncallback=1`;
    const opts = {
      method: 'GET',
    };

    const response = await fetch(url, opts).then(res => res.json());

    ctx.json({
      body: {
        ...response,
      },
    });
  }
}
