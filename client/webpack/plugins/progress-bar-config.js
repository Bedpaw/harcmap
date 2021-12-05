const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

class ProgressBarConfig {
  constructor () {
    return new ProgressBarWebpackPlugin({
      format: `  Build ${chalk.bgGray(':bar')} ${chalk.green.bold(':percent')} `,
      renderThrottle: 100,
      total: 200,
      width: 30,
      complete: '█',
      incomplete: ' ',
      stream: process.stdout,
      clear: false,
      summary: false,
      customSummary: () => undefined,
    });
  }
}

module.exports = ProgressBarConfig;
