/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

const useBuildBundle = (process.env.ENABLE_SERVE_DIST === 'true');

const HTML = ({ content, store }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>Web Starter Kit</title>
      <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic" />
      <link rel="stylesheet" href="//cdn.rawgit.com/necolas/normalize.css/master/normalize.css" />
      <link rel="stylesheet" href="//cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css" />
      <style>{`
        html, body {
          height: 100%;
        }

        #mount {
          height: 100%;
        }
      `}</style>
    </head>
    <body>
      <div id="mount" dangerouslySetInnerHTML={{ __html: content }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__preload__ = ${serialize(store.getState())};` }} />
      <script src={useBuildBundle ? '/assets/js/app.min.js' : '/assets/js/app.js'} />
    </body>
  </html>
);

HTML.defaultProps = {
  content: '',
};

HTML.propTypes = {
  content: PropTypes.string,
  store: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

export default HTML;
