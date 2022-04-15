const chalk = require('chalk');
const ProgressBar = require('progress');
const webpack = require('webpack');

class ProgressBarPlugin {
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

function ProgressBarWebpackPlugin (options) {
  options = options || {};

  const stream = options.stream || process.stderr;
  const enabled = stream && stream.isTTY;

  if (!enabled) {
    return () => undefined;
  }

  const barLeft = chalk.bold('[');
  const barRight = chalk.bold(']');
  const preamble = chalk.cyan.bold('  build ') + barLeft;
  const barFormat = options.format || preamble + ':bar' + barRight + chalk.green.bold(' :percent');
  const summary = options.summary !== false;
  const summaryContent = options.summaryContent;
  const customSummary = options.customSummary;

  delete options.format;
  delete options.total;
  delete options.summary;
  delete options.summaryContent;
  delete options.customSummary;

  const barOptions = Object.assign({
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: 100,
    clear: true,
  }, options);

  const bar = new ProgressBar(barFormat, barOptions);

  let running = false;
  let stopDisplaying = false;
  let startTime = 0;
  let lastPercent = 0;

  const plugin = new webpack.ProgressPlugin(function (percent, msg) {
    if (stopDisplaying) {
      return;
    }

    if (!running && lastPercent !== 0 && !customSummary) {
      stream.write('\n');
    }

    const newPercent = Math.floor(percent * barOptions.width);

    if (lastPercent < percent || newPercent === 0) {
      lastPercent = percent;
    }

    if (percent === 1) {
      stream.cursorTo(0, 4);
    }

    bar.update(percent, {
      msg: msg,
    });

    if (!running) {
      running = true;
      startTime = new Date();
      lastPercent = 0;
    } else if (percent === 1) {
      const now = new Date();
      const buildTime = (now - startTime) / 1000 + 's';

      bar.terminate();

      if (summary) {
        stream.write(chalk.green.bold('Build completed in ' + buildTime + '\n\n'));
      } else if (summaryContent) {
        stream.write(summaryContent + '(' + buildTime + ')\n\n');
      }

      if (customSummary) {
        customSummary(buildTime);
      }

      running = false;
    }
  });

  return {
    plugin,
    stop: () => (stopDisplaying = true),
    start: () => (stopDisplaying = false),
  };
}

module.exports = ProgressBarPlugin;
