const { merge } = require('webpack-merge');
const commonConfigFile = require('./config.common.js');
const webpack = require('webpack');
const { TARGETS } = require('./options/enums');
const { getGlobals } = require('./options/env');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const commonConfig = commonConfigFile({ target: TARGETS.browser });

module.exports = merge(commonConfig, {
  mode: 'production',
  performance: {
    hints: false,
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      '__APP_API_URL__': JSON.stringify(''),
      ...getGlobals.dev(),
    }),
  ],
});
