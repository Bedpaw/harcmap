const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  performance: {
    hints: false,
  },
  output: {
    filename: '[id].[contenthash].js',
  },
  plugins: [
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
