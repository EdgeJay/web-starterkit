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
    'transform-react-jsx',
    'transform-es2015-spread',
    'transform-object-rest-spread',
  ],
});

// Load and initialize server app
require('./src/server/app.js');
