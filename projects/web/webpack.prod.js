const path = require('path');

const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackCommonConfig = require('./webpack.common');

const distFolderName = 'dist';

const webpackProdConfig = merge(webpackCommonConfig, {
  mode: 'production',
  devtool: 'source-map',
  bail: true,

  entry: ['./src/index.tsx'],
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: '/',
    path: path.resolve(__dirname, distFolderName),
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: ['graphql-tag/loader'],
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin([distFolderName]),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: 'public/*',
        flatten: true,
        ignore: ['index.html'],
      },
    ]),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
});

module.exports = webpackProdConfig;
