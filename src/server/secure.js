import session from 'koa-session';
import helmet from 'koa-helmet';
import CSRF from 'koa-csrf';

function initSecurity(app) {
  const config = {
    key: process.env.SESSION_KEY,
    maxAge: process.env.SESSION_MAX_AGE,
  };
  app.use(session(config, app));

  app.use(helmet());

  app.use(
    new CSRF({
      invalidSessionSecretMessage: JSON.stringify({
        validated: false,
        error: 'Invalid session secret',
      }),
      invalidTokenMessage: JSON.stringify({
        validated: false,
        error: 'Invalid CSRF token',
      }),
    })
  );
  app.use(async (ctx, next) => {
    // if method is not GET or POST
    if (!['GET', 'POST'].includes(ctx.method)) {
      await next();
      return;
    }

    if (ctx.method === 'GET') {
      ctx.state.csrf = ctx.csrf;
    }

    await next();
  });
}

module.exports = { initSecurity };
