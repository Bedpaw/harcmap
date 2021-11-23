const { merge } = require('webpack-merge');
const commonConfigFile = require('./webpack.common.js');
const webpack = require('webpack');
const HtmlWebpackConfig = require('./webpack/plugins/html-webpack-config');
const { TARGETS } = require('./webpack/enums');

const commonConfig = commonConfigFile({ target: TARGETS.browser });

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackConfig(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
      USER: JSON.stringify('demo@demo.com'),
      PASSWORD: JSON.stringify('HarcMap1'),
      ADMIN_USER: JSON.stringify('admin@demo.com'),
      ADMIN_PASSWORD: JSON.stringify('HarcMap1'),
      API_URL: JSON.stringify(''),
    }),
  ],
});
