require('dotenv').config();
require('babel-register')({
  presets: [
    ['env', {
      targets: {
        node: 'current',
      },
    }],
    'react',
  ],
  plugins: [
    ['styled-components', {
      ssr: true,
    }],
    'transform-react-jsx',
    'transform-es2015-spread',
    'transform-object-rest-spread',
    ['transform-assets', {
      extensions: ['png', 'jpg', 'jpeg', 'svg', 'gif'],
      name: '/assets/img/[name].[ext]',
    }],
    ['transform-assets', {
      extensions: ['otf', 'ttf'],
      name: '/assets/fonts/[name].[ext]',
    }],
    'system-import-transformer',
  ],
});

// Load and initialize server app
require('./src/server/app.js');
