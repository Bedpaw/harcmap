const { merge } = require('webpack-merge');
const commonConfigFile = require('./config.common.js');
const webpack = require('webpack');
const { TARGETS } = require('./options/enums');
const { getGlobals } = require('./options/env');

const commonConfig = commonConfigFile({ target: TARGETS.mobileApp });

module.exports = merge(commonConfig, {
  mode: 'production',
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      '__APP_API_URL__': JSON.stringify('https://app.harcmap.pl'),
      ...getGlobals.prod(),
    }),
  ],
});
