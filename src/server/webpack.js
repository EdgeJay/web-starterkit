import webpack from 'webpack';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
import webpackConfig from '../../webpack.config';

function initWebpack(app) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  // extract webpack config and pass it to webpack
  const [clientConfig] = webpackConfig;
  clientConfig.output.path = '/';
  const compiled = webpack(clientConfig);

  // add devMiddleware to add webpacking capabilities to Koa server app
  // (instead of having a separate webpack-dev-server)
  app.use(devMiddleware(compiled, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
    },
  }));

  app.use(hotMiddleware(compiled, {
    log: console.log, // eslint-disable-line
  }));
}

module.exports = { initWebpack };
