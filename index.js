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
    ['transform-assets-import-to-string', {
      extensions: ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.otf', '.ttf'],
      baseDir: '/assets',
      baseUri: '',
    }],
    'system-import-transformer',
  ],
});

// Load and initialize server app
require('./src/server/app.js');
