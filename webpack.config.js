require('dotenv').load();
const path = require('path');
const webpack = require('webpack');

const clientConfig = {
  target: 'web',
  entry: {
    signup: './src/client/signup.js',
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
                node: 'current',
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
  ],
};

module.exports = [clientConfig];
