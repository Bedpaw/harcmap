const { merge } = require('webpack-merge');
const commonConfigFile = require('./config.common.js');
const webpack = require('webpack');
const { TARGETS } = require('./options/enums');

const commonConfig = commonConfigFile({ target: TARGETS.browser });

module.exports = merge(commonConfig, {
  mode: 'production',
  performance: {
    hints: false,
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
