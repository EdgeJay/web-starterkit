require('dotenv').load();
const path = require('path');
const webpack = require('webpack');

const clientConfig = {
  target: 'web',
  entry: {
    app: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      'react-hot-loader/patch',
      './src/client/App.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist/assets/'),
    filename: 'js/[name].js',
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
          plugins: [
            'transform-react-jsx',
            'transform-runtime',
            'transform-es2015-spread',
            'transform-object-rest-spread',
            'react-hot-loader/babel',
          ],
        },
      }
    }, {
      test: /\.(png|jpg|jpeg|svg|gif)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]',
        },
      },
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
