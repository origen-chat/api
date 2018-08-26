const path = require('path');

const { EnvironmentPlugin } = require('webpack');
const { InjectManifest } = require('workbox-webpack-plugin');

const webpackConfig = {
  mode: 'none',
  target: 'web',

  plugins: [
    new EnvironmentPlugin([
      'NODE_ENV',
      'API_ENDPOINT',
      'GRAPHQL_WS_ENDPOINT',
      'GOOGLE_CLIENT_ID',
    ]),

    new InjectManifest({
      swSrc: path.join('src', 'serviceWorker', 'index.ts'),
      swDest: 'service-worker.js',
    }),
  ],
};

module.exports = webpackConfig;
