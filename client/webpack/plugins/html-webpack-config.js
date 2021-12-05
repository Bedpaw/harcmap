const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SRC } = require('../options/enums');
const resolve = require('../options/utils').resolve;

class HtmlWebpackConfig {
  constructor (config = {}) {
    return new HtmlWebpackPlugin({
      template: resolve(SRC + '/index.ejs'),
      templateParameters: {
        capacitor: config.capacitor || false,
      },
      filename: 'index.html',
    });
  }
}

module.exports = HtmlWebpackConfig;
