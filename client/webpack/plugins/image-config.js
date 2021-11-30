const CopyPlugin = require('copy-webpack-plugin');

class ImageConfig {
  constructor () {
    return new CopyPlugin({
      patterns: [
        {
          from: 'src/img',
          to: 'img',
        },
      ],
    });
  }
}

module.exports = ImageConfig;
