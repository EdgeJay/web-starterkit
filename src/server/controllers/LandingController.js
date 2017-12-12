import React from 'react';
import { renderToString, renderToStaticNodeStream } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ServerStyleSheet } from 'styled-components';
import { AsyncComponentProvider, createAsyncContext } from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import renderRoutes from '../../client/utils/renderRoutes';
import { configureStore } from '../../client/stores';
import HTML from '../utils/HTML';
import { getInitialState } from '../utils/redux';

const debug = require('debug')('landing');

function renderContent({ store, history, routes, location, isAppShell = false }) {
  return new Promise(resolve => {
    const sheet = new ServerStyleSheet();

    let content = '';
    let styles = null;
    let asyncState = {};

    if (!isAppShell) {
      match({ history, routes, location }, (error, redirectLocation, renderProps) => {
        // create asyncContext to tap into state and send back to client
        const asyncContext = createAsyncContext();

        if (renderProps) {
          const app = (
            <AsyncComponentProvider asyncContext={asyncContext}>
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
            </AsyncComponentProvider>
          );

          asyncBootstrapper(app).then(() => {
            content = renderToString(sheet.collectStyles(app));
            styles = sheet.getStyleElement();
            asyncState = asyncContext.getState();

            resolve({ error, redirectLocation, content, styles, asyncState });
          });
        } else {
          resolve({ error, redirectLocation, content, styles, asyncState });
        }
      });
    } else {
      resolve({
        error: null,
        redirectLocation: null,
        content,
        styles,
        asyncState,
      });
    }
  });
}

export default class LandingController {
  static async getLanding(ctx) {
    const location = ctx.request.originalUrl;
    const appShellRequested = ctx.path === '/app-shell.html';
    const memoryHistory = createMemoryHistory(location);
    const routes = renderRoutes();

    debug(
      'method: %s, path: %s, app shell requested: %o',
      ctx.request.method,
      location,
      appShellRequested
    );

    const initialState = getInitialState({
      csrf: ctx.state.csrf,
      isAppShell: appShellRequested,
    });

    const store = configureStore(memoryHistory, initialState);
    const history = syncHistoryWithStore(memoryHistory, store);

    const { error, redirectLocation, content, styles, asyncState } = await renderContent({
      store,
      history,
      routes,
      location,
      isAppShell: appShellRequested,
    });

    if (error) {
      ctx.status = 500;
    } else if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search);
    } else {
      const html = <HTML content={content} styles={styles} store={store} asyncState={asyncState} />;

      ctx.body = renderToStaticNodeStream(html);
      ctx.type = 'html';
      ctx.status = 200;
    }
  }
}
