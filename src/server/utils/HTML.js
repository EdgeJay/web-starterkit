/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import { generateFontFace } from '../../client/utils/staticAssets';

const enablePWA = (process.env.ENABLE_PWA_MODE === 'true');
const useBuildBundle = (process.env.ENABLE_SERVE_DIST === 'true');
const disableJSBundle = (process.env.DISABLE_JS_BUNDLE === 'true');

function generatePreloadJS() {
  const bundles = [
    'about',
    'features',
    'libraries',
  ];

  let index = 0;

  if (!disableJSBundle) {
    return bundles.map((item) => {
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
        dangerouslySetInnerHTML={{ __html: `
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', function () {
            navigator.serviceWorker.register('sw.js')
              .then(function (registration) {
                console.log('SW registered: ' + registration);
              })
              .catch(function (err) {
                console.log('SW registration failed: ' + err);
              });
          });
        }
        ` }}
      />
    );
  }

  return null;
}

function generateJSBundle() {
  const bundles = [
    'vendor',
    'app',
  ];

  let index = 0;

  if (!disableJSBundle) {
    return bundles.map((item) => {
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>Web Starter Kit</title>
      <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic" />
      <link rel="stylesheet" href="//cdn.rawgit.com/necolas/normalize.css/master/normalize.css" />
      <link rel="stylesheet" href="//cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css" />
      {generatePreloadJS()}
      <style dangerouslySetInnerHTML={{ __html: generateFontFace() }} />
      <style dangerouslySetInnerHTML={{ __html: `
        html, body {
          height: 100%;
        }

        #mount {
          height: 100%;
        }
      ` }}
      />
      {styles}
    </head>
    <body>
      <div id="mount" dangerouslySetInnerHTML={{ __html: content }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__preload__ = ${serialize(store.getState())};` }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__asyncState__ = ${serialize(asyncState)};` }} />
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
  store: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  styles: PropTypes.arrayOf(PropTypes.element),
  asyncState: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
};

export default HTML;
