import Router from 'koa-router';
import LandingController from './controllers/LandingController';

function initRoutes(app) {
  const router = new Router();

  router.get('/', LandingController.getLanding);
  router.get('/hello', LandingController.getHello);

  app.use(router.routes(), router.allowedMethods());
}

module.exports = { initRoutes };
