import helmet from 'koa-helmet';
import CSRF from 'koa-csrf';

function initSecurity(app) {
  app.use(helmet());
  app.use(new CSRF());
}

module.exports = { initSecurity };
