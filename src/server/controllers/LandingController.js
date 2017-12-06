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

function renderContent({ store, history, routes, location }) {
  return new Promise((resolve) => {
    const sheet = new ServerStyleSheet();

    let content = '';
    let styles = '';
    let asyncState = null;

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
  });
}

export default class LandingController {
  static async getLanding(ctx) {
    const location = ctx.path;
    const memoryHistory = createMemoryHistory(location);
    const routes = renderRoutes();

    const initialState = {
      main: {
        csrf: ctx.state.csrf,
        enableCSRFTest: true,
        csrfResponse: '',
        busy: {
          flickrRecents: false,
        },
        xhr: {
          flickrRecents: null,
        },
      },
    };

    const store = configureStore(memoryHistory, initialState);
    const history = syncHistoryWithStore(memoryHistory, store);

    const { error, redirectLocation, content, styles, asyncState } =
      await renderContent({ store, history, routes, location });

    if (error) {
      ctx.status = 500;
    } else if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search);
    } else {
      const html = (
        <HTML
          content={content}
          styles={styles}
          store={store}
          asyncState={asyncState}
        />
      );

      ctx.body = renderToStaticNodeStream(html);
      ctx.type = 'html';
      ctx.status = 200;
    }
  }
}
