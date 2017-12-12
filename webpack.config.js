require('dotenv').load();
const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const analyseBuildMode = process.env.ANALYSE_BUILD_MODE === 'true';
const inProductionMode = process.env.NODE_ENV === 'production';
const inDevelopmentMode = process.env.NODE_ENV === 'development';
const enablePWA = process.env.ENABLE_PWA_MODE === 'true';
const enableHMR = process.env.ENABLE_WEBPACK_HMR === 'true' && !inProductionMode;

const envVars = ['NODE_ENV', 'ENABLE_PWA_MODE', 'ENABLE_WEBPACK_HMR', 'ENABLE_SERVE_DIST'];

const outputPath = path.resolve(__dirname, './dist/assets/');

function generateOutputFilename() {
  let fn = 'js/[name].min.js';

  if (enableHMR || inDevelopmentMode) {
    fn = 'js/[name].js';
  }

  return fn;
}

function generateEntry() {
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

  if (enableHMR) {
    entry.app = entry.app.concat(hmrLibs);
  }

  entry.app.push('./src/client/AppWrapper.js');

  return entry;
}

function generateBabelPlugins() {
  const babelPlugins = [
    [
      'styled-components',
      {
        ssr: true,
      },
    ],
    'transform-react-jsx',
    'transform-runtime',
    'transform-es2015-spread',
    'transform-object-rest-spread',
  ];

  if (enableHMR) {
    babelPlugins.push('react-hot-loader/babel');
  }

  return babelPlugins;
}

function generateWebpackPlugins() {
  const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
  });

  const workboxPlugin = new WorkboxPlugin({
    globDirectory: path.resolve(outputPath, '../'),
    globPatterns: ['**/*.{html,js,gif,png,jpg,jpeg,svg,otf,ttf,json,ico}'],
    swSrc: './src/client/sw.js',
    swDest: path.resolve(outputPath, '../sw.js'),
  });

  let plugins = [];

  if (inProductionMode) {
    plugins = [
      new webpack.EnvironmentPlugin(envVars),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      commonChunkPlugin,
      new MinifyPlugin(),
      new CompressionPlugin(),
    ];
  } else {
    // eslint-disable-next-line
    if (enableHMR) {
      plugins = [
        new webpack.EnvironmentPlugin(envVars),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        commonChunkPlugin,
      ];
    } else {
      plugins = [
        new webpack.EnvironmentPlugin(envVars),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        commonChunkPlugin,
      ];
    }
  }

  if (enablePWA) {
    plugins.push(workboxPlugin);
  }

  if (analyseBuildMode) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: '../../reports/webpack/report.html',
      })
    );
  }

  return plugins;
}

const clientConfig = {
  target: 'web',
  entry: generateEntry(),
  output: {
    path: outputPath,
    filename: generateOutputFilename(),
    chunkFilename: generateOutputFilename(),
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, './src/client')],
        options: {
          configFile: './.eslintrc.js',
          formatter: require('eslint-friendly-formatter'),
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                'env',
                {
                  targets: {
                    browsers: ['last 2 versions'],
                  },
                  modules: false,
                },
              ],
              'react',
            ],
            plugins: generateBabelPlugins(),
          },
        },
      },
      {
        test: /\.(html|ico|png|jpg|jpeg|svg|gif|otf|ttf|json)$/,
        use: {
          loader: 'file-loader',
          options: {
            context: path.resolve(__dirname, 'src/client/assets'),
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
  plugins: generateWebpackPlugins(),
};

/*
if (inDevelopmentMode) {
  clientConfig.devtool = "eval-source-map";
}
*/

module.exports = [clientConfig];
