import bodyParser from 'koa-bodyparser';

function initBodyParser(app) {
  app.use(bodyParser());
}

function initHelpers(app) {
  app.use(async (ctx, next) => {
    ctx.json = ({ body, code = 200 }) => {
      ctx.body = body;
      ctx.type = 'application/json;charset=utf-8';
      ctx.status = code;
    };

    await next();
  });
}

module.exports = { initHelpers, initBodyParser };
