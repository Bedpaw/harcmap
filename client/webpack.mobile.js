const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const { htmlWebpackPlugin } = require('./webpack/utils');

module.exports = merge(common, {
  mode: 'development',
  performance: {
    hints: false,
  },
  output: {
    filename: '[id].[contenthash].js',
  },
  plugins: [
    htmlWebpackPlugin({ capacitor: true }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      USER: JSON.stringify(''),
      PASSWORD: JSON.stringify(''),
      ADMIN_USER: JSON.stringify(''),
      ADMIN_PASSWORD: JSON.stringify(''),
      API_URL: JSON.stringify('https://localhost:3030'),
    }),
  ],
});
