import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ServerStyleSheet } from 'styled-components';
import renderRoutes from '../../client/utils/renderRoutes';
import { configureStore } from '../../client/stores';
import HTML from '../utils/HTML';

function renderContent({ store, history, routes, location }) {
  return new Promise((resolve) => {
    const sheet = new ServerStyleSheet();

    let content = '';

    match({ history, routes, location }, (error, redirectLocation, renderProps) => {
      if (renderProps) {
        content = renderToString(sheet.collectStyles(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>,
        ));
      }

      const styles = sheet.getStyleElement();

      resolve({ error, redirectLocation, content, styles });
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
      },
    };

    const store = configureStore(memoryHistory, initialState);
    const history = syncHistoryWithStore(memoryHistory, store);

    const { error, redirectLocation, content, styles } =
      await renderContent({ store, history, routes, location });

    if (error) {
      ctx.status = 500;
    } else if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search);
    } else {
      const app = `<!DOCTYPE html>${renderToString(<HTML content={content} styles={styles} store={store} />)}`;
      ctx.body = app;
      ctx.type = 'html';
      ctx.status = 200;
    }
  }
}
