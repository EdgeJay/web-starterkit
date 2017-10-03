import bodyParser from 'koa-bodyparser';

function initBodyParser(app) {
  app.use(bodyParser());
}

module.exports = { initBodyParser };
