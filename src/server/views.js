import path from 'path';
import views from 'koa-views';

function initViews(app) {
  const viewsFolder = path.resolve(__dirname, 'views');

  app.use(
    views(viewsFolder, {
      cache: process.env.NODE_ENV === 'production',
      map: {
        html: 'dust',
      },
    })
  );
}

module.exports = { initViews };
