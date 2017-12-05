require('dotenv').load();
const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const analyseBuildMode = (process.env.ANALYSE_BUILD_MODE === 'true');
const inDevelopmentMode = (process.env.NODE_ENV === 'development');
const enableHMR = (process.env.ENABLE_WEBPACK_HMR === 'true' &&
  process.env.NODE_ENV !== 'production');

const envVars = ['NODE_ENV', 'ENABLE_PWA_MODE', 'ENABLE_WEBPACK_HMR', 'ENABLE_SERVE_DIST'];

const outputPath = path.resolve(__dirname, './dist/assets/');

let outputFilename = 'js/[name].min.js';

const hmrLibs = [
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
  'react-hot-loader/patch',
];

const entry = {
  vendor: [
    'classnames',
    'fetch-ponyfill',
    'react',
    'react-dom',
    'react-router',
    'react-router-redux',
    'redux-thunk',
    'react-async-component',
    'react-async-bootstrapper',
    'prop-types',
    'styled-components',
  ],
  app: [],
};

const babelPlugins = [
  ['styled-components', {
    ssr: true,
  }],
  'transform-react-jsx',
  'transform-runtime',
  'transform-es2015-spread',
  'transform-object-rest-spread',
];

const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
});

const workboxPlugin = new WorkboxPlugin({
  globDirectory: path.resolve(outputPath, '../'),
  globPatterns: ['**/*.{html,js,gif,png,jpg,jpeg,svg,otf,ttf,json,ico}'],
  swSrc: './src/client/sw.js',
  swDest: path.resolve(outputPath, '../sw.js'),
});

let plugins = [
  new webpack.EnvironmentPlugin(envVars),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  commonChunkPlugin,
  new MinifyPlugin(),
  new CompressionPlugin(),
  workboxPlugin,
];

if (enableHMR) {
  outputFilename = 'js/[name].js';

  entry.app = entry.app.concat(hmrLibs);

  babelPlugins.push('react-hot-loader/babel');

  plugins = [
    new webpack.EnvironmentPlugin(envVars),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    commonChunkPlugin,
  ];
}

if (analyseBuildMode) {
  plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: '../../reports/webpack/report.html',
  }));
}

entry.app.push('./src/client/AppWrapper.js');

const clientConfig = {
  target: 'web',
  entry,
  output: {
    path: outputPath,
    filename: outputFilename,
    chunkFilename: outputFilename,
    publicPath: '/assets/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [path.resolve(__dirname, './src/client')],
      options: {
        configFile: './.eslintrc.js',
        formatter: require('eslint-friendly-formatter')
      }
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              targets: {
                browsers: [
                  'last 2 versions',
                ],
              },
              modules: false,
            }],
            'react',
          ],
          plugins: babelPlugins,
        },
      }
    }, {
      test: /\.(html|ico|png|jpg|jpeg|svg|gif|otf|ttf|json)$/,
      use: {
        loader: 'file-loader',
        options: {
          context: path.resolve(__dirname, 'src/client/assets'),
          name: '[path][name].[ext]',
        },
      },
    }]
  },
  plugins,
};

/*
if (inDevelopmentMode) {
  clientConfig.devtool = "eval-source-map";
}
*/

module.exports = [clientConfig];
