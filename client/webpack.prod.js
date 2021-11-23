const { merge } = require('webpack-merge');
const commonConfigFile = require('./webpack.common.js');
const webpack = require('webpack');
const { TARGETS } = require('./webpack/enums');

const commonConfig = commonConfigFile({ target: TARGETS.browser });

module.exports = merge(commonConfig, {
  mode: 'production',
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
      API_URL: JSON.stringify(''),
    }),
  ],
});
