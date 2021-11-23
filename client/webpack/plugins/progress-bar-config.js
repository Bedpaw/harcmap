const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const dayjs = require('dayjs');

class ProgressBarConfig {
  constructor () {
    return new ProgressBarWebpackPlugin({
      format: '  Build ' + chalk.bgGray(':bar') + ' ' + chalk.green.bold(':percent') + ' ',
      renderThrottle: 100,
      total: 200,
      width: 30,
      complete: '█',
      incomplete: '-',
      stream: process.stdout,
      clear: false,
      summary: false,
      customSummary (buildTime) {
        process.stderr.write(chalk.green('  Done at ' + chalk.bold(dayjs().format('HH:mm:ss'))));
        process.stderr.write(chalk.green.bold('\n  Build completed in ' + buildTime + '\n\n'));
      },
    });
  }
}

module.exports = ProgressBarConfig;
