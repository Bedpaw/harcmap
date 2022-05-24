const { merge } = require('webpack-merge');
const commonConfigFile = require('./config.common.js');
const webpack = require('webpack');
const { TARGETS } = require('./options/enums');
const { getGlobals } = require('./options/env');

const commonConfig = commonConfigFile({ target: TARGETS.mobileApp });

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      '__APP_API_URL__': JSON.stringify('https://dev.harcmap.pl'),
      ...getGlobals.dev(),
    }),
  ],
});
