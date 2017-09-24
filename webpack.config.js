require('dotenv').load();
const path = require('path');
const webpack = require('webpack');

const clientConfig = {
  target: 'web',
  entry: {
    signup: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './src/client/signup.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist/assets/js/'),
    filename: '[name].js',
    publicPath: '/assets/js/',
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
            }],
            'react',
          ],
          plugins: [
            'transform-react-jsx',
            'transform-runtime',
          ],
        },
      }
    }]
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

module.exports = [clientConfig];
