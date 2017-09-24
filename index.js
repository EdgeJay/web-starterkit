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
  ],
});

// Load and initialize server app
require('./src/server/app.js');
