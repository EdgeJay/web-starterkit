import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from '../../client/routes';
import { configureStore } from '../../client/stores';
import HTML from '../../client/utils/HTML';

export default class LandingController {
  static async getLanding(ctx) {
    const location = ctx.path;
    const memoryHistory = createMemoryHistory(location);
    const store = configureStore(memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);
    let content = '';

    match({ history, routes, location }, (error, redirectLocation, renderProps) => {
      if (error) {
        ctx.status = 500;
      } else if (redirectLocation) {
        ctx.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        content = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>,
        );
      }
    });

    const app = `<!DOCTYPE html>${renderToString(<HTML content={content} store={store} />)}`;
    ctx.body = app;
    ctx.type = 'html';
    ctx.status = 200;
  }

  static async getHello(ctx) {
    ctx.body = 'Hello!';
    ctx.type = 'html';
  }
}
