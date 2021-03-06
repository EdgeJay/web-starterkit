import path from 'path';
import Router from 'koa-router';
import serve from 'koa-static';
import ApiController from './controllers/ApiController';
import LandingController from './controllers/LandingController';

function initRoutes(app) {
  const router = new Router();

  router.get('/', LandingController.getLanding);
  router.get('/app-shell.html', LandingController.getLanding);
  router.get('/about', LandingController.getLanding);
  router.get('/features', LandingController.getLanding);
  router.get('/flickr', LandingController.getLanding);
  router.get('/flickr-recents', ApiController.getFlickrRecents);
  router.get('/libraries', LandingController.getLanding);
  router.get('/extend', LandingController.getLanding);
  router.get('/contact', LandingController.getLanding);

  // API
  router.post('/validate-csrf', ApiController.postValidateCSRF);

  app.use(router.routes(), router.allowedMethods());
}

function initStatic(app) {
  if (process.env.ENABLE_SERVE_DIST !== 'true') {
    return;
  }

  app.use(serve(path.resolve(__dirname, '../../dist')));
}

module.exports = { initRoutes, initStatic };
