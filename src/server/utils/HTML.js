/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import staticAssets, { generateFontFace } from '../../client/utils/staticAssets';

const inProductionMode = process.env.NODE_ENV === 'production';
const inDevelopmentMode = process.env.NODE_ENV === 'development';
const enableHMR = process.env.ENABLE_WEBPACK_HMR === 'true' && !inProductionMode;
const enablePWA = process.env.ENABLE_PWA_MODE === 'true';
const useBuildBundle = !(enableHMR || inDevelopmentMode);
const disableJSBundle = process.env.DISABLE_JS_BUNDLE === 'true';

function generatePreloadJS() {
  const bundles = [];

  let index = 0;

  if (!disableJSBundle && bundles.length > 0) {
    return bundles.map(item => {
      index += 1;
      return (
        <link
          key={index}
          rel="preload"
          as="script"
          href={useBuildBundle ? `/assets/js/${item}.min.js` : `/assets/js/${item}.js`}
        />
      );
    });
  }

  return null;
}

function generateRegisterSWJS() {
  if (enablePWA) {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', function () {
            navigator.serviceWorker.register('sw.js')
              .then(function (registration) {
                console.log('SW installing: ' + registration.installing);
                console.log('SW waiting: ' + registration.waiting);
                console.log('SW active: ' + registration.active);
                // registration.pushManager.subscribe({ userVisibleOnly: true });
              })
              .catch(function (err) {
                console.log('SW registration failed: ' + err);
              });
          });
        }
        `,
        }}
      />
    );
  }

  return null;
}

function generateJSBundle() {
  const bundles = ['vendor', 'app'];

  let index = 0;

  if (!disableJSBundle) {
    return bundles.map(item => {
      index += 1;
      return (
        <script
          key={index}
          src={useBuildBundle ? `/assets/js/${item}.min.js` : `/assets/js/${item}.js`}
        />
      );
    });
  }

  return null;
}

const HTML = ({ content, styles, store, asyncState }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content="Web Starter Kit" />
      <meta name="msapplication-TileImage" content={staticAssets.images.favicon144} />
      <meta name="msapplication-TileColor" content="#4858ea" />
      <meta name="theme-color" content="#4858ea" />
      <title>Web Starter Kit</title>
      <link rel="icon" href={staticAssets.images.favicon} />
      <link rel="apple-touch-icon" href={staticAssets.images.favicon152} />
      <link
        rel="stylesheet"
        href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic"
      />
      <link rel="stylesheet" href="//cdn.rawgit.com/necolas/normalize.css/master/normalize.css" />
      <link
        rel="stylesheet"
        href="//cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css"
      />
      {generatePreloadJS()}
      <style dangerouslySetInnerHTML={{ __html: generateFontFace() }} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        html, body {
          height: 100%;
        }

        #mount {
          height: 100%;
        }
      `,
        }}
      />
      {styles}
      <link rel="manifest" href={staticAssets.manifest} />
    </head>
    <body>
      <div id="mount" dangerouslySetInnerHTML={{ __html: content }} />
      <script
        dangerouslySetInnerHTML={{ __html: `window.__preload__ = ${serialize(store.getState())};` }}
      />
      <script
        dangerouslySetInnerHTML={{ __html: `window.__asyncState__ = ${serialize(asyncState)};` }}
      />
      {generateRegisterSWJS()}
      {generateJSBundle()}
    </body>
  </html>
);

HTML.defaultProps = {
  content: '',
  styles: [],
};

HTML.propTypes = {
  content: PropTypes.string,
  store: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  styles: PropTypes.arrayOf(PropTypes.element),
  asyncState: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default HTML;
