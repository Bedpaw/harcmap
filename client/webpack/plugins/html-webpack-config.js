const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = require('../utils').resolve;

class HtmlWebpackConfig {
  constructor (config = {}) {
    return new HtmlWebpackPlugin({
      template: resolve('src/index.ejs'),
      templateParameters: {
        capacitor: config.capacitor || false,
      },
      filename: 'index.html',
    });
  }
}

module.exports = HtmlWebpackConfig;
