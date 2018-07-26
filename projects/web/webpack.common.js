const path = require('path');

const { InjectManifest } = require('workbox-webpack-plugin');

const webpackConfig = {
  mode: 'none',
  target: 'web',

  plugins: [
    new InjectManifest({
      swSrc: path.join('src', 'serviceWorker', 'index.ts'),
    }),
  ],
};

module.exports = webpackConfig;
