import Router from 'koa-router';
import LandingController from './controllers/LandingController';

function initRoutes(app) {
  const router = new Router();

  router.get('/', LandingController.getLanding);
  router.get('/about', LandingController.getLanding);
  router.get('/libraries', LandingController.getLanding);
  router.get('/extend', LandingController.getLanding);
  router.get('/contact', LandingController.getLanding);

  app.use(router.routes(), router.allowedMethods());
}

module.exports = { initRoutes };
